import bcrypt from "bcryptjs";
const CompareString = async (str1, str2) => {
  const isSame = await bcrypt.compare(str1, str2);
  return isSame;
};
export default CompareString;
