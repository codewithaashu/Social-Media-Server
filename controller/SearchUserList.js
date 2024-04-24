import Users from "../models/Users.js";

const SearchUserList = async (req, res) => {
  try {
    //get the keywords by req.params
    const { keyword } = req.params;
    //create a query . firstName includes those keywords or lastName includes those keywords
    const query = {
      $or: [
        { firstName: { $regex: keyword, $options: "i" } },
        { lastName: { $regex: keyword, $options: "i" } },
      ],
    };
    //find user with query
    const users = await Users.find(query).select(
      "firstName lastName _id profileUrl profession"
    );
    return res
      .status(200)
      .json({ message: "Search result successfully", success: true, users });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
export default SearchUserList;
