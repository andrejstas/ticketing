import mongoose, { Document } from "mongoose";

// An interface that describes the properties that are required
// to creat a new user

interface UserAttrs {
  email: string;
  password: string;
}

// An Interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attr: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
