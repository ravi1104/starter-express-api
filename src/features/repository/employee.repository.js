import { userModel } from "../models/user.model.js";

export const loginUserRepo = async (data) => {
  return await userModel.findOne(data);
};
export const submitReviewRepo = async (id,data) => {
  return await userModel.findByIdAndUpdate({id},{data});
};
export const registerUserRepo=async(data)=>{
  return await userModel.create(data);
}
export const pendingReviewRepo = async (id) => {
  return await userModel.findById(id).populate('requestReview');
};
