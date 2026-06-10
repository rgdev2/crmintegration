const mongoose = require('mongoose');

const onlineBookingSchema = new mongoose.Schema(
  {
    userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    onlinePoojaId: { type: mongoose.Schema.Types.ObjectId, ref: 'OnlinePooja', required: true },
    amount:        { type: Number, required: true },

    // User preferences at booking time
    preferredDate:  { type: Date },
    gotraName:      { type: String, default: '' },      // family gotra
    wishes:         { type: String, default: '' },      // what the user wants to pray for
    memberNames:    { type: String, default: '' },      // names of family members for pooja

    // Payment
    isPaid:              { type: Boolean, default: false },
    razorpayOrderId:     { type: String, default: '' },
    razorpayPaymentId:   { type: String, default: '' },
    razorpaySignature:   { type: String, default: '' },

    // Booking lifecycle
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    adminNote: { type: String, default: '' },           // admin can add a note for user

    // Video proof (uploaded by admin after pooja is done)
    videoFile:        { type: String, default: '' },    // filename in uploads/videos/
    videoOriginalName:{ type: String, default: '' },    // original filename for download
    videoUrl:         { type: String, default: '' },    // full URL to serve the file
    videoExternalUrl: { type: String, default: '' },    // optional YouTube/Drive link
    videoUploadedAt:  { type: Date },
  },
  { timestamps: true }
);

onlineBookingSchema.index({ userId: 1 });
onlineBookingSchema.index({ onlinePoojaId: 1 });
onlineBookingSchema.index({ status: 1 });

module.exports = mongoose.model('OnlineBooking', onlineBookingSchema);
