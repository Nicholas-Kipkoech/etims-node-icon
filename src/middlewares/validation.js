import e from "express";
import Joi from "joi";

export const validateOrg = (organizationRequest) => {
  const schema = Joi.object({
    organization_name: Joi.string().required(),
    organization_email: Joi.string().email().required(),
    organization_phone: Joi.string().required(),
    business_class: Joi.string().required(),
    business_segment: Joi.string().required(),
    business_family: Joi.string().required(),
    business_comodity: Joi.string().required(),
  });
  return schema.validate(organizationRequest);
};
