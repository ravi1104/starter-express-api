import express from "express";
const router=express.Router();
import { viewAllEmployeesRepo } from "../repository/admin.repository.js";
import { requestReviewRepo } from "../repository/performance.repository.js";

router.get('/', async (req, res) => {
    try {
      let employees = [];
      let pendingReview = [];
      let showLogin = true;

      if (req.session && req.session._id) {
        // console.log("logged in user")
        employees = await viewAllEmployeesRepo(req.session._id);
        pendingReview = await requestReviewRepo(req.session._id);
        showLogin = false;
        return res.render('home', { req, employees, pendingReview, showLogin,showlogout:true });
      }
  
      res.render('home', { req, employees, pendingReview, showLogin });
    } catch (error) {
      res.status(500).send('Internal Server Error');
      console.error('Error:', error);
    }
  });
  
router.get('/login',(req,res)=>{
    res.render('login-register',{showlogin:true})
})
router.get('/register',(req,res)=>{
    res.render('login-register',{showlogin:false});
})

export default router;
