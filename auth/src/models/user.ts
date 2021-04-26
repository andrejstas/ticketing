import mongoose, { Model, Document, Schema } from "mongoose";
import { Password } from "../services/password";

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
interface UserDoc extends Document, UserAttrs {}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // This would be more view related responsibility - view level logic. Temporarily here.
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
