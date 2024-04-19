//create the model or collection

//to create the model we need schema
//import mongoose for creating schema and model
import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      //you can set a custom message  to be shown when validation fails
      required: [true, "First name is required field"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profileUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dycobmjyk/image/upload/v1711939908/Social%20Media/userprofile_ikl880.png",
    },
    coverPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dycobmjyk/image/upload/v1713039461/eya0bt7n2km0ewx42zv0.jpg",
    },
    about: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    instagramURL: {
      type: String,
      default: "",
    },
    twitterURL: {
      type: String,
      default: "",
    },
    facebookURL: {
      type: String,
      default: "",
    },
    friends: {
      //friends are the collection of users. it contains the entities of users model
      //it is connected to users model
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    },
    views: {
      //it contains the collection of the object id of users
      type: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    },
  },
  //whenever there is changes in Users model, it store the timestamps
  { timestamps: true }
);

//create the model we pass the schema and model name
export default mongoose.model("Users", UserSchema);
