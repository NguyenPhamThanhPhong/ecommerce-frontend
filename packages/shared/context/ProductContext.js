import { create } from 'zustand';
import { useEffect, useState } from 'react';
import { getFavoriteProducts, getProduct, likeProduct, searchProducts, unlikeProduct } from '../api/Products';
import { useSnackbarStore } from './SnackbarContext';
import { dateBetween } from '../api/constants/Filters';

// export const useProductStore = create((set, get) => ({
//     products: {},
//     favoriteProducts: {},
//     totalPage: 0,
//     currentPage: 0,
//     selectedProduct: null,
//     fetchProducts: async ({ pageable, filters, pub }) => {
//         const products = await searchProducts(pageable, [], pub);
//         if (products) {
//             get().setProducts(products.data);
//         }
//     },
//     setProducts: (products) => {
//         const productsMap = products.reduce((acc, product) => {
//             acc[product.id] = product;
//             return acc;
//         }, {});
//         set({ products: productsMap });
//     },
//     setFavoriteProducts: (products) => {
//         const productsMap = products.reduce((acc, product) => {
//             acc[product.id] = product;
//             return acc;
//         }, {});
//         set({ favoriteProducts: productsMap });
//     },
//     setSelectedProduct: (product) => {
//         set({ selectedProduct: product });
//     },
//     getOrFetch: async (id, pub) => {
//         const { products } = get();
//         if (products[id]) {
//             get().setSelectedProduct(products[id]);
//             return products[id];
//         }
//         const product = await getProduct(id, pub);
//         set({ products: { ...products, [id]: product }, selectedProduct: product });
//     }
// }));

export default function useProductContext() {
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalInstances, setTotalInstances] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const { pub } = useSnackbarStore();

    useEffect(() => {
        setHasPrev(currentPage > 0);
        setHasNext(currentPage < totalPage - 1);
        pub(`Found ${totalPage} pages`, 'info');
    }, [currentPage, totalPage]);

    function consumeResponse(response) {
        if (!response) return;

        setProducts(response.data);
        setTotalPage(response.totalPages);
        setTotalInstances(response.totalInstances);
    }

    const loadFirstPage = async ({ size = 5, filters }) => {
        const response = await searchProducts({ page: 0, size }, filters, pub);
        consumeResponse(response);
    }
    const loadPage = async ({ page, size = 5, filters }) => {
        const response = await searchProducts({ page, size }, filters, pub);
        consumeResponse(response);
        setCurrentPage(page);
    }
    const loadNextPage = async ({ size = 5, filters }) => {
        const response = await searchProducts({ page: currentPage + 1, size }, filters, pub);
        consumeResponse(response);
        const next = currentPage + 1;
        setCurrentPage(next);
    }
    const loadPrevPage = async ({ size = 5, filters }) => {
        const response = await searchProducts({ page: currentPage - 1, size }, filters, pub);
        consumeResponse(response);
        const prev = currentPage - 1;
        setCurrentPage(prev);
    }
    const search = async (pageable, filters) => {
        const response = await searchProducts(pageable, filters, pub);
        consumeResponse(response);
    }
    return {
        products,
        setProducts,
        hasPrev,
        hasNext,
        totalPage,
        currentPage,
        totalInstances,
        loadFirstPage,
        loadPage,
        loadNextPage,
        loadPrevPage,
        search,
    }
}

export function useProductDetailContext({ detail }) {
    const [product, setProduct] = useState(detail || {});
    const [variants, setVariants] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [displayImage, setDisplayImage] = useState(null);
    const [variantId, setVariantId] = useState(null);
    const [fav, setFav] = useState(false);
    const [tabsData, setTabsData] = useState([]);
    const { pub } = useSnackbarStore();

    useEffect(() => {
        setDisplayImage(product?.thumbnailUrl);
        if (product?.productImages) {
            const newVariants = product.productImages.map((image) => ({
                id: image.id,
                value: image,
                label: image.name,
            }));
            setVariants(newVariants);
            const newColors = product.productImages.map((image) => image.colour);
            setColors(newColors);
            const newTabsData = [
                { value: 'highlights', label: 'Hightlights', content: product?.highlights },
                { value: 'description', label: 'Description', content: product?.description },
                { value: 'rating', label: 'Rating', content: product?.rating },
                { value: 'policies', label: 'Policies', content: product?.policies }
            ]
            setTabsData(newTabsData);
        }

    }, [product]);

    const getProductDetail = async (code) => {
        const product = await getProduct(code, pub);
        setProduct(product);
    }

    async function handleLikeProduct(id) {
        const res = await likeProduct(id, pub);
        if (res) setFav(true);
    }
    async function handleUnlikeProduct(id) {
        const res = await unlikeProduct(id, pub);
        if (res) setFav(false);
    }
    function handleImageChange(image) {
        if (image === null) {
            setDisplayImage(product?.thumbnailUrl)
            return;
        }
        setDisplayImage(image);
    }
    function changeProductImage(productImage) {
        if (productImage === null) {
            setDisplayImage(product?.thumbnailUrl);
            setVariantId(null);
            return;
        }
        setVariantId(productImage.id);
        setDisplayImage(productImage.imageUrl);
        setSelectedColor(productImage.color);
    }
    function changeFav(e) {
        if (e.target.checked) {
            handleLikeProduct(product.id);
        } else {
            handleUnlikeProduct(product.id);
        }
    }


    return {
        product,
        fav,
        tabsData,
        colors, setColors, selectedColor,
        displayImage, setDisplayImage: handleImageChange,
        variants, variantId,
        changeProductImage,
        getProductDetail,
        changeFav
    }
}

export function useFavProductContext() {
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalInstances, setTotalInstances] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);
    const { pub } = useSnackbarStore();

    useEffect(() => {
        setHasPrev(currentPage > 0);
        setHasNext(currentPage < totalPage - 1);
    }, [currentPage, totalPage]);

    function consumeResponse(response) {
        if (!response) return;
        setProducts(response.data);
        setTotalPage(response.totalPages);
        setTotalInstances(response.totalInstances);
    }

    const loadFirstPage = async (size = 5) => {
        const response = await getFavoriteProducts({ page: 0, size }, pub);
        consumeResponse(response);
    }
    const loadNextPage = async (size = 5) => {
        const response = await getFavoriteProducts({ page: currentPage + 1, size }, pub);
        consumeResponse(response);
        const next = currentPage + 1;
        setCurrentPage((currentPage) => next);
    }
    const loadPrevPage = async (size = 5) => {
        const response = await getFavoriteProducts({ page: currentPage - 1, size }, pub);
        consumeResponse(response);
        const prev = currentPage - 1;
        setCurrentPage(prev);
    }
    return {
        productsFav: products,
        setProductsFav: setProducts,
        hasPrevFav: hasPrev,
        hasNextFav: hasNext,
        totalPageFav: totalPage,
        currentPageFav: currentPage,
        totalInstancesFav: totalInstances,
        loadFirstPageFav: loadFirstPage,
        loadNextPageFav: loadNextPage,
        loadPrevPageFav: loadPrevPage,
    }
}

export function useProductHotContext() {
    const { products, loadFirstPage, hasPrev, hasNext, loadNextPage, loadPrevPage } = useProductContext();

    function calculateFilters() {
        const now = new Date();
        const upperBound = new Date();
        upperBound.setDate(now.getDate() + 5);
        return dateBetween({ paramName: 'availableDate', lowerBound: now, upperBound: upperBound });
    }

    function loadNextPageHot() {
        const filters = calculateFilters()
        loadNextPage({ filters, size: 3 });
    }
    function loadPrevPageHot() {
        const filters = calculateFilters()
        loadPrevPage({ filters, size: 3 });
    }
    function loadFirstPageHot() {
        const filters = calculateFilters()
        loadFirstPage({ filters, size: 3 });
    }
    return {
        productsHot: products,
        hasNextHot: hasNext,
        hasPrevHot: hasPrev,
        loadFirstPageHot,
        loadNextPageHot,
        loadPrevPageHot,
    }
}