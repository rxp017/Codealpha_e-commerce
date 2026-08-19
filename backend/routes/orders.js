import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders (Create new order / Checkout)
router.post('/', protect, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a complete shipping address' 
      });
    }

    // 1. Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // 2. Validate stock and prepare order items
    const orderItems = [];
    let itemsPrice = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.product;
      
      if (!product) {
        return res.status(400).json({ 
          success: false, 
          message: 'A product in your cart no longer exists' 
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${product.name}. Only ${product.stock} available.` 
        });
      }

      const itemTotal = product.price * cartItem.quantity;
      itemsPrice += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.images && product.images.length > 0 ? product.images[0].url : ''
      });
    }

    // 3. Calculate prices
    const shippingPrice = itemsPrice > 100 ? 0 : 15.00; // Free shipping over $100
    const taxPrice = Number((itemsPrice * 0.08).toFixed(2)); // 8% tax
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    // 4. Create the order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'credit_card',
      itemsPrice: Number(itemsPrice.toFixed(2)),
      shippingPrice,
      taxPrice,
      totalPrice,
      status: 'processing' // Simulating immediate successful payment
    });

    // 5. Deduct stock
    for (const cartItem of cart.items) {
      await Product.findByIdAndUpdate(cartItem.product._id, {
        $inc: { stock: -cartItem.quantity }
      });
    }

    // 6. Clear the cart
    await Cart.findOneAndDelete({ user: req.user._id });

    res.status(201).json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/myorders (Get logged in user's orders)
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders (Admin: Get all orders)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/:id (Get specific order by ID)
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Ensure user can only view their own orders (unless admin)
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/:id/status (Admin: Update order status)
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;

    // Set timestamps based on status
    if (status === 'delivered') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
