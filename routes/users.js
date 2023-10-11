import  express  from "express";
import { asyncCatcher } from "../utils/asyncCatcher.js";
import passport from "passport";
import { storeReturnTo } from "../utils/middleware.js";
import * as userControl from "../controllers/users.js"

const userRoutes = express.Router({mergeParams: true});

userRoutes.get('/register', userControl.newUserForm);

userRoutes.post('/register', asyncCatcher(userControl.newUser));

userRoutes.get('/login', asyncCatcher(userControl.loginUserForm));

userRoutes.post('/login',storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'}), asyncCatcher(userControl.loginUser));

userRoutes.get('/logout',  userControl.logoutUser);

export {userRoutes}