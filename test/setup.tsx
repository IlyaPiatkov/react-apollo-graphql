import '@testing-library/jest-dom';
import React from 'react';
import { 
  TextEncoder, 
  // TextDecoder 
} from 'util';


type BasicProps = React.PropsWithChildren<{
  [key: string]: unknown;
}>;

// Mock MUI components with simple implementations
jest.mock('@mui/material/Grid', () => ({
  __esModule: true,
  default: function Grid(props: BasicProps) {
    return React.createElement('div', { 'data-testid': 'mui-grid', ...props }, props.children);
  }
}));

jest.mock('@mui/material/Stack', () => ({
  __esModule: true,
  default: function Stack(props: BasicProps) {
    return React.createElement('div', { 'data-testid': 'mui-stack', ...props }, props.children);
  }
}));

jest.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: function Typography(props: BasicProps) {
    return React.createElement('div', { 'data-testid': 'mui-typography', ...props }, props.children);
  }
}));

jest.mock('@mui/material/InputLabel', () => ({
  __esModule: true,
  default: function InputLabel(props: BasicProps) {
    return React.createElement('label', { 'data-testid': 'mui-input-label', ...props }, props.children);
  }
}));

jest.mock('@mui/material/Select', () => ({
  __esModule: true,
  default: function Select(props: BasicProps) {
    return React.createElement('select', { 'data-testid': 'mui-select', ...props }, props.children);
  }
}));

jest.mock('@mui/material/MenuItem', () => ({
  __esModule: true,
  default: function MenuItem(props: BasicProps) {
    return React.createElement('option', { 'data-testid': 'mui-menu-item', ...props }, props.children);
  }
}));

// Mock global APIs
global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

// Mock IntersectionObserver for infinite scroll tests
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver
});

// Mock scrollTo
window.scrollTo = jest.fn();

