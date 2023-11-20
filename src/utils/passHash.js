import bcrypt from "bcrypt";

const encrypt = async (value) => {
  const saltRounds = 12;
  const hash = await bcrypt.hash(value, saltRounds);
  return hash;
};

const compare = async (password, savedPass) => {
  const comparePass = await bcrypt.compare(password, savedPass);
  return comparePass;
};

export default { compare, encrypt };
