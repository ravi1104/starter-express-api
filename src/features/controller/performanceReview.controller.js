
import { addPerformanceRevRepo,updatePerformanceRevRepo,listPerformanceRevRepo,requestReviewRepo } from "../repository/performance.repository.js";

export const updatePerformanceRev = async (req, res) => {
  try {
    // const reviewerId
    const reviewerId=req.params.reviewerId;
    const data=req.query.data;
    const employeeId=req.params.employeeId;
    const updated = await updatePerformanceRevRepo(employeeId,reviewerId,data);
    let reviews;
    if(updated){
     reviews = await listPerformanceRevRepo(req.params.employeeId);
    }
    res.render('reviews',{reviews,employeeId:req.params.employeeId});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const listPerformanceRev = async (req, res) => {
  try {
    const reviews = await listPerformanceRevRepo(req.params.id);
    res.render('reviews', { reviews,employeeId:req.params.id });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const requestReview=async(req,res)=>{
  const {employeeId,reviewerId}=req.body;
  try{
    await requestReviewRepo(employeeId,reviewerId);
    res.redirect('home',308);
  }
  catch(error){
    res.status(400).send(error);
  }
}