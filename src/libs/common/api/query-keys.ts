export const queryKeys = {
    orders: {
        all: ['orders'] as const,
        detail: (id: string | number) => ['orders', id] as const,
    },
    stores: {
        all: ['stores'] as const,
        my: ['stores', 'my'] as const,
        detail: (id: string | number) => ['stores', id] as const,
        discover: ['stores', 'discover'] as const,
        featured: ['stores', 'featured'] as const,
    },
    products: {
        all: ['products'] as const,
        detail: (storeId: string | number, productId: string | number) => ['products', storeId, productId] as const,
        byStore: (storeId: string | number) => ['products', 'store', storeId] as const,
    },
    reviews: {  
        all: ['reviews'] as const,
        detail: (id: string | number) => ['reviews', 'detail', id] as const,
        byProduct: (productId: string | number) => ['reviews', 'product', productId] as const,
    },
    location: {
        countries: ['countries'] as const,
        statesByCountry: (countryId: number) => ['states', countryId] as const,
        citiesByState: (stateId: number) => ['cities', stateId] as const,
        nearest: (lat: number, lng: number) => ['nearest-location', lat, lng] as const,
    },
};