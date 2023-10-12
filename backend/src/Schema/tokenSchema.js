import { Schema } from "mongoose";

export let tokenSchema = Schema({
  token: {
    type: String,
  },
  // type: {
  //   enum: {
  //     values: ["login", "reset", "register"],
  //     default: "login",
  //     message: (notEnum) => {
  //       return `${notEnum.value} is not valid enum`;
  //     },
  //   },
  // },
});
