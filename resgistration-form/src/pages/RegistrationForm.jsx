import { useState } from 'react';
import { useForm } from '../context/FormContext';
import StepIndicator from '../components/StepIndicator';
import TextInput from '../components/TextInput';
import { validateEmail, validatePassword, validateFullName } from '../utils/validation';
import { registerUser } from '../services/registerService';

const RegistrationForm = () => {
  const { form, setForm, step, setStep } = useForm();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Validation logic for each step
  const validateStep1 = () => {
    const newErrors = {};
    if (!validateFullName(form.fullName)) newErrors.fullName = 'Full Name is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format.';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!validatePassword(form.password)) newErrors.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setApiError('');
    try {
      await registerUser({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = undefined;
    if (step === 1) {
      if (name === 'fullName' && !validateFullName(value)) error = 'Full Name is required.';
      if (name === 'email') {
        if (!value) error = 'Email is required.';
        else if (!validateEmail(value)) error = 'Invalid email format.';
      }
    }
    if (step === 2) {
      if (name === 'password' && !validatePassword(value)) error = 'Password must be at least 6 characters.';
      if (name === 'confirmPassword') {
        if (!value) error = 'Please confirm your password.';
        else if (value !== form.password) error = 'Passwords do not match.';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  if (success) {
    return (
      <div className="form-success">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering.</p>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={step === 1 ? handleNext : handleSubmit}>
      <StepIndicator step={step} />
      {step === 1 && (
        <div className="step step-1">
          <TextInput
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.fullName}
            required
          />
          <TextInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
            type="email"
          />
          <TextInput
            label="Phone Number (optional)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            type="tel"
          />
          <button
            type="submit"
            disabled={
              !form.fullName ||
              !form.email ||
              !!Object.keys(validateStep1()).length
            }
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="step step-2">
          <TextInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            required
            type="password"
          />
          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
            required
            type="password"
          />
          <div className="form-actions">
            <button type="button" onClick={handleBack} disabled={loading}>
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {apiError && <div className="api-error">{apiError}</div>}
        </div>
      )}
    </form>
  );
};

export default RegistrationForm; 