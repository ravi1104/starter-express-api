import express from "express";
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import session from "express-session";
import adminRouter from "./src/features/routes/admin.router.js";
import userRouter from "./src/features/routes/employee.router.js"
import getRouter from "./src/features/routes/get.router.js";

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
app.use('/',getRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);

app.get('*', (req, res) => {
    res.render('error')
});



export default app;
