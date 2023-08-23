import { Rule } from "antd/es/form";
import { Regexes } from "../regexes";
import {
  isCategoryExists,
  isColorExists,
  isSizeExists,
} from "./helperFunctions";
import store from "../../redux/store";

const OnlyLettersRules: Rule[] = [
  {
    required: true,
    message: "Please input Category's name!",
  },
  {
    pattern: Regexes.ONLY_LETTERS,
    message: "Please input only letters!",
  },
];

export const CategoryRules: Rule[] = [
  ...OnlyLettersRules,
  {
    min: 3,
    max: 15,
    message: "Please input more than 3 and less than 15 letters",
  },
  () => ({
    validator(_, value) {
      if (
        isCategoryExists(store.getState().categories.categories || [], value)
      ) {
        return Promise.reject(new Error("Category already exists!"));
      }
      return Promise.resolve();
    },
    validateTrigger: "onSubmit",
  }),
];

export const SizeRules: Rule[] = [
  ...OnlyLettersRules,
  {
    min: 1,
    max: 10,
    message: "Please input more than 1 and less than 10 letters",
  },
  () => ({
    validator(_, value) {
      if (isSizeExists(store.getState().sizes.sizes || [], value)) {
        return Promise.reject(new Error("Category already exists!"));
      }
      return Promise.resolve();
    },
    validateTrigger: "onSubmit",
  }),
];

export const ColorRules: Rule[] = [
  ...OnlyLettersRules,
  {
    min: 2,
    max: 10,
    message: "Please input more than 2 and less than 10 letters",
  },
  () => ({
    validator(_, value) {
      if (isColorExists(store.getState().colors.colors || [], value)) {
        return Promise.reject(new Error("Category already exists!"));
      }
      return Promise.resolve();
    },
    validateTrigger: "onSubmit",
  }),
];
