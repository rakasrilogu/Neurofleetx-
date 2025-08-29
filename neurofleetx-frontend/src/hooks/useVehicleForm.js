import { useState } from 'react';

export default function useVehicleForm(initialValues = {
  licensePlate: '',
  location: '',
  status: '',
  mileage: 0,
  fuelLevel: 100,
}) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'mileage' || name === 'fuelLevel' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
}
