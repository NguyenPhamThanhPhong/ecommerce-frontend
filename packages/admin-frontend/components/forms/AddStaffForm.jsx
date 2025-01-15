import { useEffect, useState } from 'react'
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber, validateForm, handleFileChange } from '@shared-utils/ValidationUtils';
import { FormAlert, FormDatePicker, FormImagePicker, FormMultiSelect, FormSelect, FormTextBox } from '@shared-src/InputAssets'
import { createAccount, getAccount, updateAccount } from '@shared-api/Accounts';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export function useStaffForm({ isUpdate }) {
    const [initial, setInitial] = useState(true);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        image: null,
        enableDate: new Date(),
        disableDate: new Date(),
        birthDate: new Date(),
        phone: '099999',
        password: '',
        confirmPassword: '',

    });
    const pub = useSnackbarStore(state => state.pub);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertProps, setAlertProps] = useState({ message: 'error', severity: 'error' });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        enableDate: '',
        disableDate: '',
        image: '',
        birthDate: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (conditions) => (e) => {
        const {name} = conditions;
        const {value } = e.target;
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

    function bindForm(data) {
        const profile = data.profile
        setFormValues({
            name: profile?.name,

            email: data.email,
            image: profile?.avatarUrl,
            enableDate: new Date(data.enableDate),
            disableDate: new Date(data.disableDate),
            birthDate: new Date(data.birthDate),
            phone: profile?.phone,
            password: profile?.password,
            confirmPassword: profile?.password,
        });
    }

    function reset() {
        setFormValues({
            name: '',
            enableDate: new Date(),
            disableDate: new Date(),
            email: '',
            image: null,
            birthDate: new Date(),
            phone: '',
            password: '',
            confirmPassword: '',
        });
        if (isUpdate) {
            bindForm(initial);
        }
    }
    function loadStaff(code) {
        getAccount(code).then((data) => {
            setInitial(data);
            bindForm(data);
        });
    }

    function validate() {
        let valid = true;
        Object.keys(formValues).forEach((key) => {
            if (key === 'image') {
                return;
            }
            if (isEmpty(formValues[key])) {
                setErrors((prev) => ({ ...prev, [key]: 'This field is required' }));
                valid = false;
            }
        });
        if (formValues.password !== formValues.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            valid = false;
        }
        return valid;
    }
    function submitCreate() {
        const valid = validate();
        if (!valid) {
            const errorText = Object.values(errors).filter(isNotEmpty).join('\n');
            pub(errorText, 'error');
        }
        const request = {
            email: formValues.email,
            password: formValues.password,
            role: 'ROLE_STAFF',
            enableDate: formValues.enableDate,
            disableDate: formValues.disableDate,
            isVerified: true,
            profile: {
                fullName: formValues.name,
                phone: formValues.phone,
                avatar: typeof formValues.image === 'string' ? null : formValues.image,
                dateOfBirth: formValues.birthDate,
            },
        }
        createAccount(request, pub).then((res) => {
            if (res) {
                reset();
            }
        });
    }
    function submitUpdate() {
        const request = {
            id: initial?.id,
            email: formValues.email,
            role: 'ROLE_STAFF',
            enableDate: formValues.enableDate,
            disableDate: formValues.disableDate,
            isVerified: true,
            profile: {
                fullName: formValues.name,
                phone: formValues.phone,
                avatar: typeof formValues.image === 'string' ? null : formValues.image,
                dateOfBirth: formValues.birthDate,
            },
        }
        updateAccount(request, pub).then((res) => {
            if (res) {
                reset();
            }
        });
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

    const nameInput = {
        label: 'Name',
        value: formValues.name,
        name: 'name',
        Component: FormTextBox,
        onChange: handleInputChange({ name:'name', field: 'Name', required: true }),
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
        onChange: handleInputChange({ name:'email', field: 'Email', required: true, email: true }),
        error: errors.email !== '',
        errorText: errors.email,
        formSx: { gap: 1, width: '100%', mb: 1 },
        required: true,
    }

    const passwordInput = {
        label: 'Password',
        value: formValues.password,
        name: 'password',
        Component: FormTextBox,
        onChange: handleInputChange({ name:'password', field: 'Password', required: true, }),
        error: errors.password !== '',
        errorText: errors.password,
        formSx: { gap: 1, width: '50%' },
        required: true
    }

    const phoneInput = {
        label: 'Phone',
        value: formValues.phone,
        name: 'phone',
        Component: FormTextBox,
        onChange: handleInputChange({ field: 'Phone', required: true, numberOnly: true }),
        error: errors.phone !== '',
        errorText: errors.phone,
        formSx: { gap: 1, width: '100%', mb: 1 },
    }
    const birthDateInput = {
        label: 'Birth Date',
        value: formValues.birthDate,
        name: 'birthDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ field: 'Birth Date', isDate: true, required: true }),
        error: errors.birthDate !== '',
        errorText: errors.birthDate,
        formSx: { gap: 1 },
    }
    const enableDateInput = {
        label: 'Enable Date',
        value: formValues.enableDate,
        name: 'enableDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ name: 'enableDate', field: 'Enable Date', isDate: true, required: true }),
        error: errors.enableDate !== '',
        errorText: errors.enableDate,
        formSx: { gap: 1 },
    }
    const disableDateInput = {
        label: 'Disable Date',
        value: formValues.disableDate,
        name: 'disableDate',
        Component: FormDatePicker,
        onChange: handleInputChange({ name:'disableDate', field: 'Disable Date', isDate: true, required: true }),
        error: errors.disableDate !== '',
        errorText: errors.disableDate,
        formSx: { gap: 1 },
    }

    const imageInput = {
        label: 'Image',
        value: formValues.image,
        name: 'image',
        Component: FormImagePicker,
        onChange: onFileChange,
        alertVisible: alertVisible,
        error: errors.image !== '',
        errorText: errors.image,
        formSx: { gap: 1, width: '100%' },
    }


    return {
        formValues, errors,
        name: nameInput,
        email: emailInput,
        phone: phoneInput,
        password: passwordInput,
        submitCreate,
        submitUpdate,
        reset,
        birthDate: birthDateInput,
        alert: { alertVisible, ...alertProps },
        enableDate: enableDateInput,
        disableDate: disableDateInput,
        image: imageInput
    };
}

