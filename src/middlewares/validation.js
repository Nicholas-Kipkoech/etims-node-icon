import Joi from "joi";

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
    business_class: Joi.string().required(),
    business_segment: Joi.string().required(),
    business_family: Joi.string().required(),
  });
  return schema.validate(organizationRequest);
};

export const validateSegment = (segmentRequest) => {
  const segmentSchema = Joi.object({
    segment_code: Joi.string().required(),
    segment_name: Joi.string().required(),
  });
  return segmentSchema.validate(segmentRequest);
};

export const validateFamily = (familyRequest) => {
  const familySchema = Joi.object({
    segmentId: Joi.string().required(),
    family_code: Joi.string().required(),
    family_name: Joi.string().required(),
  });
  return familySchema.validate(familyRequest);
};
export const validateClass = (classRequest) => {
  const classSchema = Joi.object({
    familyId: Joi.string().required(),
    class_code: Joi.string().required(),
    class_name: Joi.string().required(),
  });
  return classSchema.validate(classRequest);
};

export const validateComodity = (comodityRequest) => {
  const comoditySchema = Joi.object({
    classId: Joi.string().required(),
    comodity_name: Joi.string().required(),
    comodity_code: Joi.string().required(),
  });
  return comoditySchema.validate(comodityRequest);
};
