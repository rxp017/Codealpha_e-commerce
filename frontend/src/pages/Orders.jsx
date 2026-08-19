import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../lib/api.js';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        if (response.success) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold tracking-tight text-white/90 mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="surface p-12 text-center">
          <h2 className="text-2xl font-medium text-text-muted mb-4">You have no orders yet.</h2>
          <a href="/products" className="btn-primary inline-block">Browse Products</a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="surface p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:border-copper/30 hover:shadow-glow-copper">
              <div className="space-y-1">
                <p className="text-sm text-text-muted">Order ID</p>
                <p className="font-mono text-white/90">{order._id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-text-muted">Date</p>
                <p className="text-white/90">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-text-muted">Total</p>
                <p className="font-bold text-electric">${order.totalPrice.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-text-muted">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.isDelivered ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-copper/10 text-copper border-copper/20'}`}>
                  {order.isDelivered ? 'Delivered' : 'Processing'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
