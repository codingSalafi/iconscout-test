import type { Ref } from 'vue';

/** Just what I need from the API */
export interface AssetItem {
    id: number;
    uuid: string;
    title: string;
    previewUrl: string;
    jsonUrl?: string;
    dotlottieUrl?: string;
}

type Asset = 'icon' | 'illustration' | 'lottie' | '3d';

/**
 * Reactive IconScout search with pagination.
 * Calling `loadMore()` fetches the next page and appends items.
 */

export function useSearch(
    query: Ref<string>,
    asset: Ref<'icon' | 'illustration' | 'lottie' | '3d'>,
    opts = { price: 'free' as 'free' | 'all', perPage: 24 }
) {
    const config = useRuntimeConfig();
    //derive a cache key from the query and asset
    const cacheKey = computed(() => `search-${asset.value}-${query.value}`);


    const cache = useState<{
        items: AssetItem[];
        page: number;
        finished: boolean;
        totalNo: number;
    }>(cacheKey.value, () => ({
        items: [],
        page: 1,
        finished: false,
        totalNo: 0
    }));
 
    const pending = ref(false);
    const error = ref<Error | null>(null);

    /** internal fetcher */
    async function fetchPage() {
        if (pending.value || cache.value.finished) return;
        pending.value = true;

        try {
            const endpoint = new URL('https://api.iconscout.com/v3/search');
            endpoint.searchParams.set('query', query.value.trim());
            endpoint.searchParams.set('asset', asset.value);
            endpoint.searchParams.set('price', opts.price);
            endpoint.searchParams.set('page', String(cache.value.page));
            endpoint.searchParams.set('per_page', String(opts.perPage));

            const data = await $fetch<{
                response: any; items: any[]
            }>(endpoint.toString(), {
                headers: {
                    'Client-ID': config.public.iconScoutId as string,
                }
            });
            //console.log('data', data);

            const dataArray: any[] = data.response.items.data ?? [];
            if (cache.value.page == 1) {
                cache.value.totalNo = data.response.items.total ?? 0;
            }

            //console.log('totalNo', cache.value.totalNo);
            if (!dataArray.length) {
                cache.value.finished = true
                //console.log("This fired");
            } else {
                const pageItems = dataArray.map((r: any) => {
                    const common = {
                        id: r.id,
                        uuid: r.uuid,
                        title: r.name,
                        previewUrl: r.urls.thumb ?? r.urls.png_256,
                    }
                    if (asset.value === 'lottie') {
                        return {
                            ...common,
                            jsonUrl: `https://api.iconscout.com/v3/lottie/${r.uuid}`,
                            dotlottieUrl: `https://api.iconscout.com/v3/lottie/${r.uuid}?format=dotlottie`
                        }
                    }
                    return common
                })

                cache.value.items.push(...pageItems);
                cache.value.page++;

            }

        } catch (e) {
            error.value = e as Error
        } finally {
            pending.value = false
        }
    }


    //Automatically trigger fetch on a new tab/query
    watch(() => cacheKey.value, (newKey, oldKey) => {
        if (newKey === oldKey) {
            fetchPage();
            return
        }
        cache.value.items = [];
        cache.value.page = 1;
        cache.value.finished = false;
        cache.value.totalNo = 0

        fetchPage();
    }, { immediate: true });


    function loadMore() {
        fetchPage();
    }

    return {
        items: cache.value.items,
        pending,
        finished: computed(() => cache.value.finished),
        error,
        totalNo: computed(() => cache.value.totalNo),
        loadMore
    }
}
