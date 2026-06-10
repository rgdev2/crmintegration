require('dotenv').config();
require('express-async-errors');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes        = require('./routes/auth');
const userRoutes        = require('./routes/user');
const panditRoutes      = require('./routes/pandit');
const adminRoutes       = require('./routes/admin');
const poojaRoutes       = require('./routes/pooja');
const bookingRoutes     = require('./routes/booking');
const paymentRoutes     = require('./routes/payment');
const productRoutes     = require('./routes/product');
const cartRoutes        = require('./routes/cart');
const orderRoutes       = require('./routes/order');
const onlinePoojaRoutes    = require('./routes/onlinePooja');
const offlineBookingRoutes = require('./routes/offlineBooking');
const astroRoutes          = require('./routes/astro');

const app = express();

connectDB();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, please try again later.' },
}));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Server is running' }));

app.use('/api/auth',          authRoutes);
app.use('/api/users',         userRoutes);
app.use('/api/pandits',       panditRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/poojas',        poojaRoutes);
app.use('/api/bookings',      bookingRoutes);
app.use('/api/payments',      paymentRoutes);
app.use('/api/products',      productRoutes);
app.use('/api/cart',          cartRoutes);
app.use('/api/orders',        orderRoutes);
app.use('/api/online-poojas',    onlinePoojaRoutes);
app.use('/api/offline-bookings', offlineBookingRoutes);
app.use('/api/astro',            astroRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});
