import { PerformanceReviewModel } from "../models/performance.review.model.js"
export const addPerformanceRevRepo = async (employeeId, reviewerId) => {
        const previous = await PerformanceReviewModel.findOne({ employeeId, reviewerId });

        if (previous) {
            previous.isReviewed=false;
            previous.save();
            return previous; 
        }

        const newPerformanceReview = await PerformanceReviewModel.create({ employeeId, reviewerId });
        return newPerformanceReview;
};

export const updatePerformanceRevRepo=async(employeeId,reviewerId,data)=>{
    return PerformanceReviewModel.updateOne({employeeId,reviewerId},{performanceDetails:data});
}


export const updatePerformanceRevByIdRepo=async(id,data)=>{
    return PerformanceReviewModel.findByIdAndUpdate({_id:id},data);
}

export const listPerformanceRevRepo=async(id)=>{
    return PerformanceReviewModel.find({employeeId:id});
}


export const requestReviewRepo=async(employeeId)=>{
    return PerformanceReviewModel.find({employeeId,isReviewed:false}).populate('employeeId');
}