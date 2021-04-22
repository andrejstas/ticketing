import mongoose, { Model, Document, Schema } from "mongoose";

// An interface that describes the properties that are required
// to creat a new user

interface UserAttrs {
  email: string;
  password: string;
}

// An Interface that describes the properties that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
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

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
