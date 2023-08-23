import { Rule } from "antd/es/form";
import { Regexes } from "../regexes";
import { isCategoryExists } from "./helperFunctions";
import store from "../../redux/store";

export const CategoryRules: Rule[] = [
  {
    required: true,
    message: "Please input Category's name!",
  },
  {
    pattern: Regexes.ONLY_LETTERS,
    message: "Please input only letters!",
  },
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
