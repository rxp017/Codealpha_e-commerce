import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createOrder } from '../lib/api.js';

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Credit Card',
  });

  const cartItems = [
    { name: 'Alpha Sixty-Five Kit', qty: 1, price: 199.99, image: 'mock.png', product: 'prod_1' },
    { name: 'Copper Artisan Keycap', qty: 2, price: 45.00, image: 'mock2.png', product: 'prod_2' }
  ];

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = itemsPrice * 0.08;
  const shippingPrice = itemsPrice > 100 ? 0 : 15;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate order submission
    const orderData = {
      orderItems: cartItems,
      shippingAddress: {
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      const response = await createOrder(orderData);
      if (response.success) {
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-white/90">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="surface p-6 space-y-4">
            <h2 className="text-xl font-semibold text-copper">Shipping Information</h2>
            <div>
              <label className="block text-sm text-text-muted mb-1">Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">Postal Code</label>
                <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="input-field" placeholder="10001" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Country</label>
              <input required type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" placeholder="USA" />
            </div>
          </div>

          <div className="surface p-6 space-y-4">
            <h2 className="text-xl font-semibold text-copper">Payment Method</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="Credit Card" checked={formData.paymentMethod === 'Credit Card'} onChange={handleChange} className="text-copper focus:ring-copper" />
                <span>Credit Card</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="paymentMethod" value="PayPal" checked={formData.paymentMethod === 'PayPal'} onChange={handleChange} className="text-copper focus:ring-copper" />
                <span>PayPal</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center">
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>

      <div className="surface p-8 h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-6 text-white/90">Order Summary</h2>
        <div className="space-y-4 divide-y divide-white/10">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between py-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-text-muted">Qty: {item.qty}</p>
              </div>
              <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
          
          <div className="py-4 space-y-2">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Shipping</span>
              <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Tax (8%)</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="pt-4 flex justify-between text-xl font-bold text-electric">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
