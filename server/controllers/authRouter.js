const express = require('express');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'chingubears3';

router.route('/auth/login').post(passport.authenticate('local'), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/google').get(passport.authenticate("google", {
    scope: ["email", "profile"]
}));

router.get(
    '/auth/google/redirect',
    passport.authenticate('google', {
      failureMessage: 'Cannot login to Google, please try again later!',
      failureRedirect: 'http://localhost:3000/login/error',
      successRedirect: 'http://localhost:3000/login/success',
    })
  );

router.route('/auth/github').get(passport.authenticate("github"));

router.route('/auth/github/redirect').get(passport.authenticate("github"), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/facebook').get(passport.authenticate("facebook"));

router.route('/auth/facebook/redirect').get(passport.authenticate("facebook"), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/twitter').get(passport.authenticate("twitter"));

router.route('/auth/twitter/redirect').get(passport.authenticate("twitter"), (req, res)=> {
    var token = jwt.sign({ id: req.user.id }, SECRET, {
        expiresIn: 86400 // 24 hours
    });
    req.user.access_token = token;
    res.send({  likedPalettes: req.user.likedPalettes,
                name: req.user.name,
                email: req.user.email,
                access_token: token });
});

router.route('/auth/logout').get((req, res)=> {
    console.log('req', req)
    req.logout();
    res.redirect('/user');
});

module.exports = router;