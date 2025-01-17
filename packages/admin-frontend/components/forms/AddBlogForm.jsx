import { Box } from '@mui/material'
import React from 'react'

import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormRichText, FormSelect, FormSimpleThumbnailPicker, FormTextBox } from '@shared-src/InputAssets'
import { createBrand, getBrand, updateBrand } from '@shared-api/Brands';
import { createCategory, getCategory, updateCategory } from '@shared-api/Categories';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { createBlogPost, getBlogPost, updateBlogPost } from '@shared-api/BlogPosts';

export function useBlogForm({ isUpdate, }) {
    const [initial, setInitial] = useState({})
    const pub = useSnackbarStore((state) => state.pub);
    const [formValues, setFormValues] = useState({
        title: '',
        subtitle: '',
        content: '',
        isDraft: false,
    });
    const [errors, setErrors] = useState({
        title: '',
        subtitle: '',
        content: '',
        isDraft: '',
    });
    const [thumbnail, setThumbnail] = useState({ type: 'url', value: '' });

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

    function validate() {
        let valid = true;
        Object.keys(formValues).forEach((key) => {
            if (key === 'image') {
                return;
            }
        });
        return valid;
    }

    function reset() {
        if (isUpdate) {
            setFormValues({
                title: initial.title,
                subtitle: initial.subtitle,
                content: initial.content,
                isDraft: initial.isDraft,
            })
            setThumbnail({ type: 'url', value: initial.imageUrl });
            return;
        }
        setFormValues({
            title: '',
            subtitle: '',
            content: '',
            isDraft: '',
        });
        setErrors({
            title: '',
            subtitle: '',
            content: '',
            isDraft: '',
        });
        setThumbnail({ type: 'url', value: null });
    }

    function submitCreate() {
        const valid = validate();
        if (!valid) {
            const errorText = Object.values(errors).filter(isNotEmpty).join('\n');
            console.log(errorText);
            pub(errorText, 'error');
        }
        const request = {
            title: formValues.title,
            subtitle: formValues.subtitle,
            content: formValues.content,
            isDraft: false,
            isHTML: true,
            image: typeof thumbnail?.value === 'string' ? null : thumbnail?.value,
        }
        createBlogPost(request, pub).then((res) => {
            if (res) {
                reset();
                pub('Brand created successfully', 'success');
            }
        });
    }
    function submitUpdate() {
        const valid = validate();
        if (!valid) {
            const errorText = Object.values(errors).filter(isNotEmpty).join('\n');
            console.log(errorText);
            pub(errorText, 'error');
        }
        const request = {
            id: initial?.id,
            title: formValues.title,
            subtitle: formValues.subtitle,
            content: formValues.content,
            isDraft: false,
            isHTML: true,
            // image: typeof thumbnail?.value === 'string' ? null : thumbnail?.value,
        }
        updateBlogPost(request, pub).then((res) => {
            if (res) {
                setThumbnail({ type: 'url', value: res?.imageUrl });
                pub('Brand updated successfully', 'success');
            }
        });
    }
    function load(code) {
        getBlogPost(code).then((res) => {
            if (res) {
                setInitial(res);
                setFormValues({
                    title: res.title,
                    subtitle: res.subtitle,
                    content: res.content,
                    isDraft: res.isDraft
                });
                setThumbnail({ type: 'url', value: res.imageUrl });
            }
        });
    }
    const titleInput = {
        label: 'Title',
        value: formValues.title,
        name: 'title',
        Component: FormTextBox,
        onChange: handleInputChange({name: 'title'}),
        error: errors.title !== '',
        errorText: errors.title,
        rows: 2,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const subtitleInput = {
        label: 'Subtitle',
        value: formValues.subtitle,
        name: 'subtitle',
        Component: FormTextBox,
        onChange: handleInputChange({name: 'subtitle',}),
        error: errors.subtitle !== '',
        errorText: errors.subtitle,
        rows: 2,
        formSx: { gap: 1, width: '100%' },
        multiline: true,
    }
    const contentInput = {
        label: 'Content',
        value: formValues.content,
        Component: FormRichText,
        onChange: handleInputChange({ name: 'content', }),
        error: false,
        errorText: '',
        rows: 5,
        formSx: { gap: 1, maxHeight:'400px', width: '100%' },
    }

    const imageInput = {
        label: 'Image',
        value: thumbnail,
        name: 'image',
        Component: FormSimpleThumbnailPicker,
        onChange: setThumbnail,
        formSx: { gap: 1, width: '100%' },
    }


    return {
        formValues, errors,
        title: titleInput,
        image: imageInput,
        subtitle: subtitleInput,
        content: contentInput,
        submitCreate, submitUpdate, load, reset,
    };

}

