import * as express from "express";
import * as passport from "passport";
import * as path from "path";
import { checkAuthenticated, checkGuest } from "../auth/checkAuth";
import { IUser, ReactUser } from "../models/User";

const router = express.Router();

/**
 * Serves the login page.
 */
router.get("/login", checkGuest, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'));
});

/**
 * Serves the login page.
 */
router.get("/login", checkGuest, (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../", 'public', 'index.html'));
});

/**
 * Logs in a user.
 * @Body {username: string, password: string}
 */
router.post('/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info){
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      res.sendStatus(400);
      return;
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      user.password = undefined;
      res.status(200).send(user);
      return;
    });
  })(req, res, next);
});

/**
 * Logs out the current user.
 */
router.get('/logout', checkAuthenticated, (req, res) => {
  const user: IUser = <IUser>req.user;
  console.log(`${user.username} has been logged out.`);
  req.logout();
  res.redirect("/");
});

export default router;