import { userModel } from "../models/user.model.js";

export const findEmpByIdRepo=async(id)=>{
  return await userModel.findById(id);
}

export const addEmployeeRepo = async (data) => {
  return await userModel.create(data);
};
export const removeEmployeeRepo = async (id) => {
  return await userModel.findByIdAndRemove(id);
};
export const updateEmployeeRepo = async (id,role) => {
  return await userModel.findByIdAndUpdate(id,{role});
};
export const viewAllEmployeesRepo = async (excludeId ) => {
  return await userModel.find({_id:{$ne:excludeId }}).populate('review');
};