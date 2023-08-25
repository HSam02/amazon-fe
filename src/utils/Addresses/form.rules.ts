import { Rule } from "antd/es/form";
import { Regexps } from "../regexps";

export const addressRules: Rule[] = [
  {
    required: true,
    message: "Please input Your Address!",
  },
  {
    pattern: Regexps.ONLY_LETTERS,
    message: "Please input only letters!",
  },
  {
    min: 3,
    max: 25,
    message: "Please input more than 3 and less than 25 letters",
  },
];
