import { findEmpByIdRepo, removeEmployeeRepo, updateEmployeeRepo,viewAllEmployeesRepo } from "../repository/admin.repository.js";
import { addPerformanceRevRepo } from "../repository/performance.repository.js";

export const editEmployee=async(req,res)=>{
  const employee=await findEmpByIdRepo(req.params.id);
  res.render('edit-employee',{employee,showlogut:true});

}
export const assignReviewer = async (req, res) => {
  const employeeId=req.params.employeeId;
  const reviewerId=req.query.reviewerId;
  try {
    const employees=await viewAllEmployeesRepo(employeeId);
    if(reviewerId){
    await addPerformanceRevRepo(employeeId,reviewerId);
    return res.render('assign-reviewer',{employees,employeeId,assigned:true,showlogut:true})
    }

    res.render('assign-reviewer',{employees,employeeId,assigned:false,showlogut:true});
  } catch (err) {
    res.render('error',err.message)
  }
};

export const addEmployee = async (req, res) => {
  try {
    // const project = await addEmployeeRepo(req.params.projectId);
    res.render('login-register',{showlogin:false,showlogut:true});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const removeEmployee = async (req, res) => {
  try {
    console.log(req.params.id);
    await removeEmployeeRepo(req.params.id);
    res.redirect('/');

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateEmployee = async (req, res) => {
  const id=req.params.id;
  const role=req.query.role;
  try {
    const project = await updateEmployeeRepo(id,role);
    res.redirect('/');

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const viewAllEmployees = async (req, res) => {
  try {
    const project = await viewAllEmployeesRepo(req.params.projectId);
    res.render('create-issue', { projectId: req.params.projectId, project,showlogut:true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};