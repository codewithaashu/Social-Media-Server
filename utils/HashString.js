import bcrypt from "bcryptjs";
const HashString = async (str) => {
  try {
    //create the salt
    const salt = await bcrypt.genSalt(10);
    //mix with string
    const hashedStr = await bcrypt.hash(str, salt);
    return hashedStr;
  } catch (err) {
    console.log("Error in hashing the string: ", err.message);
  }
};

export default HashString;
