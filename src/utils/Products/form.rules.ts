import { Rule } from "antd/es/form";
import { Regexps } from "../regexps";

const onlyLettersRules: Rule = {
  pattern: Regexps.ONLY_LETTERS,
  message: "Please input only letters!",
};

export const requiredRule: Rule = {
  required: true,
  message: "This field can't be empty!",
};

export const nameRules: Rule[] = [
  requiredRule,
  onlyLettersRules,
  {
    min: 3,
    max: 15,
    message: "Please input more than 3 and less than 15 letters",
  },
];

export const brandRules: Rule[] = [
  requiredRule,
  onlyLettersRules,
  {
    min: 2,
    max: 15,
    message: "Please input more than 2 and less than 15 letters",
  },
];

export const descriptionRules: Rule[] = [
  {
    max: 150,
    message: "Please input less than 15 letters",
  },
];

export const priceRules: Rule[] = [
  requiredRule,
  {
    pattern: Regexps.MONEY,
    message: "Please input valid number!",
  },
  {
    min: 2,
    max: 15,
    message: "Please input more than 1 and less than 15 digits",
  },
];
