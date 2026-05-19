import { useState } from "react";

export default function useForm(initialValues = {}) {
  //   Form State
  const [values, setValues] = useState(initialValues);

  //   Handle Input Change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //   Reset Form
  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm,
  };
}
