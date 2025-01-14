import { Component, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm } from '@shared-utils/ValidationUtils';
import { FormBrandsSelect, FormCategoriesSelect, FormDatePicker, FormImageGroup, FormMultiSelect, FormNumberInput, FormRichText, FormSelect, FormTextBox, FormThumbnailPicker } from '@shared-src/InputAssets'
import { TextField } from '@mui/material';
import { createProduct, getProduct } from '@shared-api/Products';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export function useProductForm() {
    const [productId, setProductId] = useState('');
    const [seqNos, setSeqNos] = useState([]);
    const [formValues, setFormValues] = useState({
        productName: '',
        description: '',
        policies: '',
        highlights: '',
        price: 0,
        discountPercent: 0,
        categories: '',
        brand: '',
        quantity: 0,
        stock: 0,
        publishDate: new Date(),
    });
    const pub = useSnackbarStore((state) => state.pub);
    const [thumbnail, setThumbnail] = useState({ type: 'url', value: '' });
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({
        productName: '',
        description: '',
        policies: '',
        highlights: '',
        price: '',
        discountPercent: '',
        categories: '',
        brand: '',
        quantity: '',
        stock: '',
        publishDate: '',
    });
    function reset() {
        setFormValues({
            productName: '', description: '', policies: '', highlights: '',
            price: 0, discountPercent: 0, categories: [], brand: '', quantity: 0, stock: 0, publishDate: new Date(),
        });
        setThumbnail({ type: 'url', value: '' });
        setImages([]);
        setErrors({ productName: '', description: '', policies: '', highlights: '', price: '', discountPercent: '', categories: '', brand: '', quantity: '', stock: '', publishDate: '', });
    }

    const handleInputChange = (conditions) => (e) => {
        const { name } = conditions;
        const { value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    function submitCreate() {
        console.log('form val', formValues.categories)
        const createRequest = {
            name: formValues.productName,
            brandId: formValues.brand,
            categoryId: formValues.categories,
            status: 'ON_SALE',
            availableDate: formValues.publishDate,
            policies: formValues.policies,
            highlights: formValues.highlights,
            thumbnail: thumbnail?.type !== 'url' ? thumbnail.value : null,
            productImages: images?.length > 0 ? images.map((value, index) => {
                return value.type !== 'url' ? value.value : null;
            }) : null,
            discountPercent: formValues.discountPercent,
            quantity: formValues.quantity,
            price: formValues.price,
            stock: formValues.stock,
            description: formValues.description,
        }
        createProduct(createRequest, pub).then((res) => {
            if (res) {
                pub('Product created successfully', 'success');
                reset();
            }
        });

    }
    function submitUpdate() {
        const updateRequest = {
            id: productId,
            name: formValues.productName,
            brandId: formValues.brand,
            categoryId: formValues.categories,
            status: 'ON_SALE',
            availableDate: formValues.publishDate,
            policies: formValues.policies,
            highlights: formValues.highlights,
            thumbnail: thumbnail?.type !== 'url' ? thumbnail.value : null,
            appendingImages: images?.length > 0 ? images.map((value, index) => {
                return value.type !== 'url' ? value.value : null;
            }) : null,
            removalIds: seqNos,
            discountPercent: formValues.discountPercent,
            quantity: formValues.quantity,
            price: formValues.price,
            stock: formValues.stock,
            description: formValues.description,
        }
        createProduct(updateRequest, pub).then((res) => {
            if (res) {
                pub('Product created successfully', 'success');
                reset();
            }
        });

    }

    function loadProduct(code) {
        getProduct(code, pub).then((res) => {
            if (res) {
                setFormValues({
                    productName: res.name,
                    description: res.description,
                    price: res.price,
                    policies: res.policies,
                    highlights: res.highlights,
                    discountPercent: res.discountPercent,
                    categories: res.categories,
                    brand: res.brandId,
                    quantity: res.quantity,
                    stock: res.stock,
                    publishDate: res.availableDate,
                });
                setSeqNos(res.productImages.map((value, index) => {
                    return value?.seqNo;
                }));
                setProductId(res.id);
                setThumbnail({ type: 'url', value: res.thumbnail });
                setImages(res.productImages.map((value, index) => {
                    return { type: 'url', value: value?.imageUrl };
                }));
            }
        })
    };

    const productNameInput = {
        label: 'Product Name',
        value: formValues.productName,

        Component: FormTextBox,
        onChange: handleInputChange({ name: 'productName', field: 'First Name', required: true }),
        error: errors.productName !== '',
        errorText: errors.productName,
        width: '100%',
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }
    const priceInput = {
        label: 'Price',
        value: formValues.price,
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'price', field: 'price', lowerBound: 0 }),
        error: errors.price !== '',
        errorText: errors.price,
        formSx: { width: '45%' }
    }
    const discountPercentInput = {
        label: 'Discount Percentage',
        value: formValues.discountPercent,
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'discountPercent', field: 'Discount Percentage', lowerBound: 0, upperBound: 100 }),
        error: errors.discountPercent !== '',
        errorText: errors.discountPercent,
        formSx: { width: '45%' }
    }

    const descriptionInput = {
        label: 'Description Name',
        value: formValues.description,
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'description', }),
        error: errors.description !== '',
        errorText: errors.description,
        rows: 2,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const policiesInput = {
        label: 'Policies',
        value: formValues.policies,
        Component: FormRichText,
        onChange: handleInputChange({ name: 'policies', }),
        error: false,
        errorText: '',
        rows: 2,
        formSx: { gap: 1, },
    }
    const highlightsInput = {
        label: 'Highlights',
        value: formValues.highlights,
        Component: FormRichText,
        onChange: handleInputChange({ name: 'highlights', }),
        error: false,
        errorText: '',
        rows: 2,
        formSx: { gap: 1, },
    }

    const brandInput = {
        label: 'Brand',
        value: formValues.brand,
        Component: FormBrandsSelect,
        onChange: handleInputChange({ name: 'brand', required: true, field: 'Brand' }),
        error: errors.brand !== '',
        errorText: errors.brand,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const categoryInput = {
        label: 'Category',
        value: formValues.category,
        Component: FormCategoriesSelect,
        onChange: handleInputChange({ name: 'category', required: true, field: 'Category' }),
        error: errors.category !== '',
        errorText: errors.category,
        formSx: { gap: 1, width: '100%' },
    }
    const publishDate = {
        label: 'Available Date',
        value: formValues.publishDate,
        Component: FormDatePicker,
        onChange: handleInputChange({ name: 'publishDate', required: true, isDate: true }),
        error: errors.publishDate !== '',
        errorText: errors.publishDate,
        formSx: { width: '100%' },
    }

    const thumbnailInput = {
        Component: FormThumbnailPicker,
        value: thumbnail,
        onChange: setThumbnail,
    }
    const imageGroupInput = {
        value: images,
        Component: FormImageGroup,
        onChange: setImages,
    }
    const quantityInput = {
        label: 'Quantity',
        value: formValues.quantity,
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'quantity', required: true, field: 'Quantity', lowerBound: 0 }),
        error: errors.quantity !== '',
        errorText: errors.quantity,
        formSx: { width: '100%' },
    }
    const stockInput = {
        label: 'Stock',
        value: formValues.stock,
        Component: FormNumberInput,
        onChange: handleInputChange({ name: 'stock', required: true, field: 'stock', lowerBound: 0 }),
        error: errors.stock !== '',
        errorText: errors.stock,
        formSx: { width: '100%' },
    }

    return {
        formValues, errors,
        productName: productNameInput,
        description: descriptionInput,
        policies: policiesInput,
        highlights: highlightsInput,
        brand: brandInput,
        category: categoryInput,
        price: priceInput,
        discountPercent: discountPercentInput,
        quantity: quantityInput,
        stock: stockInput,
        publishDate: publishDate,
        thumbnail: thumbnailInput,
        imageGroup: imageGroupInput,
        submitCreate,
        submitUpdate,
        loadProduct,
        reset,

    };

}

