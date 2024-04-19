import jwt from "jsonwebtoken";
const GenerateToken = (id) => {
  //generate token using user's id
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY);
  return token;
};
export default GenerateToken;
