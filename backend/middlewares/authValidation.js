import Joi from "joi";

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z0-9_]+$/)
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.empty": "Username is required.",
        "string.pattern.base":
          "Username can only contain letters, numbers, and underscores.",
        "string.min": "Username must be at least {#limit} characters long.",
        "string.max": "Username must be at most {#limit} characters long.",
        "any.required": "Username is required.",
      }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.max": "Password must be at most {#limit} characters long.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least {#limit} characters long.",
      "string.max": "Password must be at most {#limit} characters long.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

export { signupValidation, loginValidation };
