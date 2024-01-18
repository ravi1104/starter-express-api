import express from "express";
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import session from "express-session";
import adminRouter from "./src/features/routes/admin.router.js";
import userRouter from "./src/features/routes/employee.router.js"
import { viewAllEmployeesRepo } from "./src/features/repository/admin.repository.js";
import { pendingReviewRepo } from "./src/features/repository/employee.repository.js";
import { requestReviewRepo } from "./src/features/repository/performance.repository.js";
const app = express();

app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

//Routes
app.get('/', async (req, res) => {
    try {
      let employees = [];
      let pendingReview = [];
      let showLogin = true;

      if (req.session._id) {
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
  
app.get('/login',(req,res)=>{
    res.render('login-register',{showlogin:true})
})
app.get('/register',(req,res)=>{
    res.render('login-register',{showlogin:false});
})
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.get('*', (req, res) => {
    res.render('error')
});



export default app;
