import express from "express";
import isAdmin from '../../middleware/isAdmin.js';
import { editEmployee,addEmployee,removeEmployee,updateEmployee,assignReviewer } from "../controller/admin.rev.controller.js";
import {updatePerformanceRev,listPerformanceRev} from "../controller/performanceReview.controller.js"
const router=express.Router();

router.get('/edit-emp/:id',isAdmin,editEmployee);
router.get('/add-emp',isAdmin,addEmployee);
router.get('/remove/:id',isAdmin,removeEmployee);
router.get('/update/:id',isAdmin,updateEmployee);


router.get('/assign/reviewer/:employeeId',isAdmin,assignReviewer);
router.get('/list/review/:id',listPerformanceRev);
router.get('/list/review/:employeeId/:reviewerId',updatePerformanceRev);
router.post('/admin/edit',isAdmin,listPerformanceRev);


export default router;