import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { Products } from '../products';
import { GET_PRODUCTS, GET_CATEGORIES } from '@features/product';


// Mock react-router
const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate
}));

const productsMock = {
  request: {
    query: GET_PRODUCTS,
    variables: { limit: 9, offset: 9 }
  },
  result: {
    data: {
      products: [
        {
          id: '1',
          title: 'Test Product 1',
          slug: 'test-product-1',
          price: '99.99',
          description: 'Test description 1',
          images: ['test-image-1.jpg'],
          creationAt: '2023-01-01',
          updatedAt: '2023-01-01',
          category: {
            id: '1',
            name: 'Category 1',
            slug: 'category-1',
            image: 'category-1.jpg',
            creationAt: '2023-01-01',
            updatedAt: '2023-01-01',
            products: []
          }
        },
        {
          id: '2',
          title: 'Test Product 2',
          slug: 'test-product-2',
          price: '149.99',
          description: 'Test description 2',
          images: ['test-image-2.jpg'],
          creationAt: '2023-01-01',
          updatedAt: '2023-01-01',
          category: {
            id: '2',
            name: 'Category 2',
            slug: 'category-2',
            image: 'category-2.jpg',
            creationAt: '2023-01-01',
            updatedAt: '2023-01-01',
            products: []
          }
        }
      ]
    }
  }
};

const categoriesMock = {
  request: {
    query: GET_CATEGORIES
  },
  result: {
    data: {
      categories: [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' }
      ]
    }
  }
};

const renderProducts = (mocks = [productsMock, categoriesMock]) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <Products />
    </MockedProvider>
  );
};

describe('Products Page Integration', () => {
  it('User visits the products page and sees a loading state followed by products and categories', async () => {
    // When: User visits the products page
    renderProducts();

    // Then: User sees a loading skeleton
    expect(screen.getByTestId('products-loading')).toBeInTheDocument();

    // And: Loading disappears
    await waitFor(() => {
      expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument();
    });

    // And: User sees the product list
    const productsContainer = within(screen.getByTestId('products'));
    // const productsPath = within(productsContainer);
    
    expect(productsContainer.getByText(productsMock.result.data.products[0].title)).toBeInTheDocument();
    expect(productsContainer.getByText(productsMock.result.data.products[1].title)).toBeInTheDocument();
    expect(productsContainer.getByText(`Byu Now ${productsMock.result.data.products[0].price} $`)).toBeInTheDocument();
    expect(productsContainer.getByText(`Byu Now ${productsMock.result.data.products[1].price} $`)).toBeInTheDocument();

    // And: User sees available category filters
    const categoriesContainer = within(screen.getByTestId('categories'));

    expect(categoriesContainer.getByText(categoriesMock.result.data.categories[0].name)).toBeInTheDocument();
    expect(categoriesContainer.getByText(categoriesMock.result.data.categories[1].name)).toBeInTheDocument();

    // And: User sees filters section
    const filtersContainer = within(screen.getByTestId('filters'));

    expect(filtersContainer.getByText('Filters')).toBeInTheDocument();
    expect(filtersContainer.getByTestId('mui-select')).toBeInTheDocument();
    expect(filtersContainer.getAllByText('Price')).toHaveLength(2);
    expect(filtersContainer.getAllByText('Price Min')).toHaveLength(2);
    expect(filtersContainer.getAllByText('Price Max')).toHaveLength(2);
    expect(filtersContainer.getAllByText('Title')).toHaveLength(2);
    expect(filtersContainer.getByText('Filter')).toBeInTheDocument();
    expect(filtersContainer.getByText('Clear Filter')).toBeInTheDocument();

  });

  it('User filters products by clicking on a category', async () => {
    const filteredProductsMock = {
      request: {
        query: GET_PRODUCTS,
        variables: { 
          limit: 9, 
          offset: 0,
          categoryId: 1
        }
      },
      result: {
        data: {
          products: [
            {
              id: '1',
              title: 'Test Product 3',
              slug: 'test-product-3',
              price: '99.99',
              description: 'Test description 3',
              images: ['test-image-3.jpg'],
              creationAt: '2023-01-01',
              updatedAt: '2023-01-01',
              category: {
                id: '1',
                name: 'Category 1',
                slug: 'category-1',
                image: 'category-1.jpg',
                creationAt: '2023-01-01',
                updatedAt: '2023-01-01',
                products: []
              }
            }
          ]
        }
      }
    };

    // Given: User is on the products page
    render(
      <MockedProvider mocks={[categoriesMock, filteredProductsMock]} addTypename={false}>
          <Products />
      </MockedProvider>
    );

    // And: Initial products are loaded
    await waitFor(() => {
      expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument();
    });

    const filtersContainer = within(screen.getByTestId('filters'));

    // When: User selects a category filter
    await userEvent.click(filtersContainer.getByTestId('mui-select'));
    await userEvent.click(filtersContainer.getByText('Category 1'));
    // When: User clicks on the "Filter" button
    await userEvent.click(filtersContainer.getByText('Filter'));

    // And: User sees only products from the selected category
    await waitFor(() => {
        expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Test Product 3')).toBeInTheDocument();
  });

  it('User scrolls to bottom and sees more products loaded', async () => {
    const nextPageMock = {
      request: {
        query: GET_PRODUCTS,
        variables: { limit: 9, offset: 9 }
      },
      result: {
        data: {
          products: [
            {
              id: '3',
              title: 'Test Product 3',
              slug: 'test-product-3',
              price: '199.99',
              description: 'Test description 3',
              images: ['test-image-3.jpg'],
              creationAt: '2023-01-01',
              updatedAt: '2023-01-01',
              category: {
                id: '1',
                name: 'Category 1',
                slug: 'category-1',
                image: 'category-1.jpg',
                creationAt: '2023-01-01',
                updatedAt: '2023-01-01',
                products: []
              }
            }
          ]
        }
      }
    };

    // Given: User is on the products page
    render(
      <MockedProvider mocks={[categoriesMock, nextPageMock]} addTypename={false}>
          <Products />
      </MockedProvider>
    );

    // And: Initial products are loaded
    await waitFor(() => {
      expect(screen.queryByTestId('products-loading')).not.toBeInTheDocument();
    });

    // When: User scrolls to the bottom of the page
    window.dispatchEvent(new Event('scroll'));

    // And: User sees new products appear
    expect(screen.getByText('Test Product 3')).toBeInTheDocument();
  });
});
