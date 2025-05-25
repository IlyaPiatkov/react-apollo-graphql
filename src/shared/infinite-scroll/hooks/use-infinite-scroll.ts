import { useEffect, useRef } from 'react';

type Params = {
    loading: boolean;
    onLoadMore: () => Promise<void>;
    threshold?: number;
    rootMargin?: number;
}

export const useInfiniteScroll = (params: Params) => {
    const {
        loading,
        onLoadMore,
        threshold = 1.0,
        rootMargin = 0,
    } = params;

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading) {
                    await onLoadMore();
                }
            },
            {
                threshold,
                rootMargin: `${rootMargin}px`,
            }
        );

        const currentTarget = targetRef.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
            observer.disconnect();
        };
    }, [loading, threshold, rootMargin]);

    return targetRef;
};