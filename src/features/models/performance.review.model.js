import mongoose from "mongoose";

const performanceReviewSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  performanceDetails: String,
  isReviewed:{
    type:Boolean,
    default:false
  }
});

export const PerformanceReviewModel = mongoose.model('performancereview', performanceReviewSchema);
