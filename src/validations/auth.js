import { body, validationResult } from "express-validator";
import statusCodes from "../utils/statusCodes.js";

const { badRequest } = statusCodes;

const validateSignUp = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 letters")
    .trim()
    .escape(),
  body("username")
    .isLength({ min: 2 })
    .withMessage("Username must be at least 2 letters")
    .trim()
    .escape(),
  body("email").isEmail().withMessage("Invalid email").trim().escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 letters")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.errors[0].msg;

      return res.status(badRequest).json({ message: errorMessage });
    } else {
      next();
    }
  },
];

const validateLogin = [
  body("username")
    .isLength({ min: 1 })
    .withMessage("Please input your Username!")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Please input your Password!")
    .trim()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.errors[0].msg;

      return res.status(badRequest).json({ message: errorMessage });
    } else {
      next();
    }
  },
];

export default { validateSignUp, validateLogin };
