import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormTextBox } from '@shared-src/InputAssets'
import { minus20Years, plus20Years } from '@shared-utils/CalculationUtils';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { createAccount, updateAccount } from '@shared-api/Accounts';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';

export function useSettingsForm({ }) {
    const {account, loadAccount } = useGlobalAccountContext();
    const pub = useSnackbarStore(state => state.pub);
    const [formValues, setFormValues] = useState({
        name: account?.profile?.fullName,
        email: account?.email,
        image: account?.profile?.avatarUrl,
        birthDate: account?.profile?.birthDate,
        phone: account?.profile?.phone,

    });
    const [alertVisible, setAlertVisible] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        image: '',
        birthDate: '',
        phone: '',
    });
    const handleInputChange = (conditions) => (e) => {
        const {name} = conditions;
        const {  value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (!validateForm(name, value, setErrors, conditions)) {
            return false;
        }
        setErrors((prev) => ({ ...prev, [name]: '' }));
        return true;
    };
    const onFileChange = handleFileChange({
        setError: (error) => setErrors((prev) => ({ ...prev, image: error })),
        setAlertVisible,
        setImage: (image) => setFormValues((prev) => ({ ...prev, image })),
        isSingle: true,
    });
    function reset() {
        if (account?.id) {
            setFormValues({
                name: account?.profile?.fullName,
                email: account?.email,
                image: account?.profile?.avatarUrl,
                birthDate: account?.profile?.birthDate,
                phone: account?.profile?.phone,
            })
            return;
        }
    }
    // Timeout effect for alert visibility
    useEffect(() => {
        if (alertVisible) {
            const timeout = setTimeout(() => {
                setAlertVisible(false); // Hide alert after 3 seconds
            }, 3000); // 3000ms = 3 seconds
            console.log('alertVisible', alertVisible);
            // Clear the timeout if error changes or alert is dismissed
            return () => clearTimeout(timeout);
        }
    }, [alertVisible]);

    function submit() {
        const request = {
            id: account?.id,
            fullName: formValues.name,
            avatar: typeof formValues.image === 'string' ? null : formValues.image,
            phone: formValues.phone,
            dateOfBirth: formValues.birthDate,
        }
        updateAccount(request, pub).then((res) => {
            if (res) {
                pub('Customer created successfully', 'success');
                reset();
            }
        });
    }
    function load(){
        loadAccount(pub);
    }

    const nameInput = {
        label: 'Name',
        value: formValues.name,
        name: 'name',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'name', field: 'Name', required: true }),
        error: errors.name !== '',
        errorText: errors.name,
        width: '100%',
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }

    const emailInput = {
        label: 'Email',
        value: formValues.email,
        name: 'email',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'email', field: 'Email', required: true, validator: isEmail }),
        error: errors.email !== '',
        errorText: errors.email,
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }

    const phoneInput = {
        label: 'Phone',
        value: formValues.phone,
        name: 'phone',
        Component: FormTextBox,
        onChange: handleInputChange({ name: 'phone', field: 'Phone', required: true, numberOnly: true }),
        error: errors.phone !== '',
        errorText: errors.phone,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const birthDateInput = {
        label: 'Birth Date',
        value: formValues.birthDate,
        name: 'birthDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ name: 'birthDate', field: 'Birth Date', isDate: true, required: true }),
        error: errors.birthDate !== '',
        errorText: errors.birthDate,
        formSx: { gap: 1 },

    }
    const imageInput = {
        label: 'Image',
        value: formValues.image,
        name: 'image',
        Component: FormImagePicker,
        onChange: onFileChange,
        error: errors.image !== '',
        errorText: errors.image,
        formSx: { gap: 1, width: '100%' },
    }


    return {
        formValues, errors,
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        birthDate: birthDateInput,
        submit, reset,
        image: imageInput
    };
}

