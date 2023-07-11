const express = require('express')
const router = require("express").Router();


// require auth middleware
const { isLoggedIn, isLoggedOut } = require('../middlewares/route-guard');




//GET home page 
router.get("/", (req, res, next) => {
  console.log(req.session)
  res.render("index");
});

//GET main page
router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('main', { user: req.session.user})
})


//GET private page
router.get('/private', isLoggedIn, (req, res, next) => {
  res.render('private', { user: req.session.user})
})


module.exports = router;
