import { ref, onMounted, onUnmounted } from "vue";

export function useInfiniteScroll(
    loadMore: () => void,
    options: {
        root?: Element | null;
        rootMargin?: string;
        threshold?: number | number[];
    } = { root: null, rootMargin: "200px", threshold: 0.1 }
) {
    const sentinel = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver

    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        }, options);
        if (sentinel.value) {
            observer.observe(sentinel.value);
        }
    });
    onUnmounted(() => {
        if (observer && sentinel.value) {
            observer.unobserve(sentinel.value);
        }
    });
    return {
        sentinel
    };
}