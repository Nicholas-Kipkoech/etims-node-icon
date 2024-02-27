import Joi from "joi";

export const validateUserAccount = (userAccountRequest) => {
  const userRegistrationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return userRegistrationSchema.validate(userAccountRequest);
};

export const validateUserLogin = (userLoginRequest) => {
  const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return userLoginSchema.validate(userLoginRequest);
};

export const validateOrg = (organizationRequest) => {
  const schema = Joi.object({
    organization_name: Joi.string().required(),
    organization_email: Joi.string().email().required(),
    organization_phone: Joi.string().required(),
  });
  return schema.validate(organizationRequest);
};
