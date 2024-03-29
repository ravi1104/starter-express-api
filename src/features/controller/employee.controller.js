import bcrypt from 'bcrypt';
import { registerUserRepo, loginUserRepo } from "../repository/employee.repository.js";
import { updatePerformanceRevByIdRepo } from "../repository/performance.repository.js";
export const registerUser=async (req,res)=>{
  try{
    const user=await registerUserRepo(req.body);
    res.redirect('/');
  }
  catch(error){
    console.log(error);
    res.render('error',{msg:error.message});
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUserRepo({ username });
    if (!user) {
      return res.render('error',{ msg: 'Invalid username' });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      req.session.role = user.role;
      req.session._id = user._id;
      return res.redirect('/');
    } else {
      // return res.status(401).json({ message: 'Invalid username or password' });
      res.render('error',{msg: 'Invalid password'})
    }
  } catch (error) {
    res.render('error',{msg:error.message});
    // res.status(500).json({ message: err.message });
  }
};

export const submitFeedback = async (req, res) => {
  const {reviewId,feedback}=req.body;
const data={
  isReviewed:true,
  performanceDetails:feedback
}
  try {
    const project = await updatePerformanceRevByIdRepo(reviewId,data);
    console.log(project);
    res.redirect('/')

  } catch (error) {
    res.render('error',{msg:error.message});
  }
};

