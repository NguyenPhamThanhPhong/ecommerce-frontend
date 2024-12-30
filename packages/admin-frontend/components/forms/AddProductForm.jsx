import {useState} from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm } from '@shared-utils/ValidationUtils';
import {FormMultiSelect, FormSelect, FormTextBox} from '@shared-src/InputAssets'

export function useProductForm({productName, description, images, price, discountPercent, discountUpperBound}) {
    const [formValues, setFormValues] = useState({
        productName:  '',
        description: '',
        images:  [],
        price:  0,
        discountPercent: 0,
        discountUpperBound:  0,
        categories: [],
        brand: '',
    });

    const [errors, setErrors] = useState({
        productName: '',
        description: '',
        images: '',
        price: '',
        discountPercent: '',
        discountUpperBound: '',
        categories: '',
        brand: '',
    });

    const handleInputChange = (conditions) => (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if(!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    const productNameInput = {
        label: 'Product Name',
        value: formValues.productName,
        name: 'productName',
        Component: FormTextBox,
        onChange: handleInputChange({ field: 'First Name', required: true }),
        error: errors.productName !== '',
        errorText: errors.productName,
        width: '100%',
        formSx: { gap: 1, width: '100%', mb:1 },
        required: true,
    }
    const descriptionInput = {
        label: 'Description Name',
        value: formValues.description,
        name: 'description',
        Component: FormTextBox,
        onChange: handleInputChange({}),
        error: errors.description !== '',
        errorText: errors.description,
        rows:2,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const brandInput ={
        label: 'Brand',
        value: formValues.brand,
        name: 'brand',
        Component: FormSelect,
        onChange: handleInputChange({}),
        error: errors.brand !== '',
        errorText: errors.brand,
        options: ['Apple', 'Samsung', 'Sony', 'Dell'],
        labelSx: { color:'#777980', fontWeight: 'bold' },
        formSx: { gap: 1, width: '100%', mb:1 },
    }

    const categoryInput = {
        label: 'Category',
        value: formValues.category,
        name: 'category',
        Component: FormMultiSelect,
        onChange: handleInputChange({}),
        error: errors.category !== '',
        errorText: errors.category,
        options: ['Electronics', 'Clothing', 'Furniture', 'Books'],
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    
    return { formValues, errors,  
        productName: productNameInput,
        description: descriptionInput,
        brand: brandInput,
        category: categoryInput,
    
    };

}

