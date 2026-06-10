const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { uploadPoojaImage, uploadPoojaVideo } = require('../config/upload');
const {
  getAllOnlinePoojas,
  getOnlinePoojaById,
  bookOnlinePooja,
  createOnlineBookingPayment,
  verifyOnlineBookingPayment,
  getMyOnlineBookings,
  createOnlinePooja,
  updateOnlinePooja,
  deleteOnlinePooja,
  getAllOnlineBookingsAdmin,
  updateBookingStatus,
  uploadVideoToBooking,
} = require('../controllers/onlinePoojaController');

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/', getAllOnlinePoojas);
router.get('/:id', getOnlinePoojaById);

// ── User ──────────────────────────────────────────────────────────────────────
router.post('/:id/book',               protect, authorize('user'), bookOnlinePooja);
router.post('/booking/payment/create', protect, authorize('user'), createOnlineBookingPayment);
router.post('/booking/payment/verify', protect, authorize('user'), verifyOnlineBookingPayment);
router.get('/my/bookings',             protect, authorize('user'), getMyOnlineBookings);

// ── Admin: Pooja management ───────────────────────────────────────────────────
router.post('/',    protect, authorize('admin'), uploadPoojaImage.single('image'), createOnlinePooja);
router.put('/:id',  protect, authorize('admin'), uploadPoojaImage.single('image'), updateOnlinePooja);
router.delete('/:id', protect, authorize('admin'), deleteOnlinePooja);

// ── Admin: Booking management ─────────────────────────────────────────────────
router.get('/admin/bookings',                          protect, authorize('admin'), getAllOnlineBookingsAdmin);
router.put('/admin/bookings/:bookingId/status',        protect, authorize('admin'), updateBookingStatus);
// Video upload: supports multipart (file) or JSON (external URL)
router.put('/admin/bookings/:bookingId/upload-video',  protect, authorize('admin'),
  uploadPoojaVideo.single('video'), uploadVideoToBooking);

module.exports = router;
