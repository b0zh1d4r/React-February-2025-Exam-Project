import { useEffect, useState, useCallback } from 'react';

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const changeHandler = useCallback((e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        onSubmitHandler(values);
    }, [values, onSubmitHandler]);

    const changeValues = useCallback((newValues) => {
        setValues(newValues);
    }, []);

    return { values, changeHandler, onSubmit, changeValues };
};