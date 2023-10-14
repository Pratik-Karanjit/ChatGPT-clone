import { Schema } from "mongoose";

export let userSchema = Schema({
  
  email: {
    type: String,
    unique: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        throw new Error("email is wrong.");
      }
    },
  },
  
  
    password: {
      type: String,
    },
});
