import express from "express";
import { submitFeedback,registerUser, loginUser } from "../controller/employee.controller.js";
import auth from "../../middleware/auth.js";
const router=express.Router();

router.route('/submitfeedback').post(auth,submitFeedback);
// router.route('/list').post(auth,pendingReview);
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
export default router;