const auth = (req, res, next) => {
  const isAdmin=req.session.role;
  if(isAdmin=='admin'){
    next();
  }
  else{
    return res.render('error');
  }
};

export default auth;
