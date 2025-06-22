import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState(1);

  return (
    <FormContext.Provider value={{ form, setForm, step, setStep }}>
      {children}
    </FormContext.Provider>
  );
}; 