import { Request, Response, NextFunction } from "express";

// Augment the SessionData type so TypeScript knows about isLoggedIn
declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
  }
}

/**
 * The Gatekeeper: Checks if the user is authenticated.
 * If not, redirects to the login page.
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
};
