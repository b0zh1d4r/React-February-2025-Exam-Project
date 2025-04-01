import { useEffect, useState, useCallback } from 'react';

// Custom hook for managing form state and handling form submissions:
export const useForm = (initialValues, onSubmitHandler) => {
    // State to store form values, initialized with initialValues:
    const [values, setValues] = useState(initialValues);

    // Effect hook to update form values whenever initialValues change:
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    // Handler for changes in input fields:
    const changeHandler = useCallback((e) => {
        // Destructure name and value from the event target (input field):
        const { name, value } = e.target;

        // Update form values by spreading the previous values and updating the specific field:
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    }, []); // Empty dependency array means this function won't change unless its dependencies change.

    // Submit handler that prevents the default form submit action and calls the onSubmitHandler:
    const onSubmit = useCallback((e) => {
        e.preventDefault(); // Prevent default form submission behavior.
        onSubmitHandler(values); // Call the onSubmitHandler with the current form values.
    }, [values, onSubmitHandler]); // Recreate the function if values or onSubmitHandler changes.

    // Function to change form values programmatically (useful for resetting or modifying form data):
    const changeValues = useCallback((newValues) => {
        setValues(newValues); // Update form values with the new values.
    }, []); // Empty dependency array means this function won't change unless its dependencies change.

    // Return the form state and helper functions to be used in the form component:
    return { values, changeHandler, onSubmit, changeValues };
};
