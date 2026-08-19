import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Phone, ArrowRight } from 'lucide-react';

const AddressForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    street: initialData?.street || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'United States',
    phone: initialData?.phone || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['fullName', 'street', 'city', 'state', 'zipCode', 'phone'];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const inputFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User, colSpan: 'col-span-full' },
    { name: 'street', label: 'Street Address', type: 'text', placeholder: '123 Keyboard Lane', icon: MapPin, colSpan: 'col-span-full' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'San Francisco', colSpan: '' },
    { name: 'state', label: 'State', type: 'text', placeholder: 'California', colSpan: '' },
    { name: 'zipCode', label: 'ZIP Code', type: 'text', placeholder: '94102', colSpan: '' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 123-4567', icon: Phone, colSpan: '' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="surface p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-copper/10 flex items-center justify-center">
          <MapPin size={20} className="text-copper" />
        </div>
        <div>
          <h2 className="font-cabinet text-xl font-semibold text-text-primary">
            Shipping Address
          </h2>
          <p className="text-sm text-text-muted">Where should we deliver your keyboard?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.name} className={field.colSpan}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {field.label}
              </label>
              <div className="relative">
                {field.icon && (
                  <field.icon
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                )}
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`input-field ${field.icon ? 'pl-11' : ''} ${
                    errors[field.name] ? 'border-status-error ring-1 ring-status-error' : ''
                  }`}
                />
              </div>
              {errors[field.name] && (
                <p className="mt-1 text-xs text-status-error">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-text-primary mb-2"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="United States" className="bg-base">United States</option>
              <option value="Canada" className="bg-base">Canada</option>
              <option value="United Kingdom" className="bg-base">United Kingdom</option>
              <option value="Australia" className="bg-base">Australia</option>
              <option value="Germany" className="bg-base">Germany</option>
              <option value="Japan" className="bg-base">Japan</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          Continue to Review
          <ArrowRight size={16} />
        </button>
      </form>
    </motion.div>
  );
};

export default AddressForm;
