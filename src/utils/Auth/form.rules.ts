import { Rule } from "antd/es/form";
import { checkEmail } from "../../services/auth.service";
import { Regexes } from "../regexes";

export const firstNameRules: Rule[] = [
  {
    required: true,
    message: "Please input your first name!",
  },
  {
    min: 2,
    max: 15,
    message: "Please input more than 2 and less than 15 letters",
  },
  {
    pattern: Regexes.ONLY_LETTERS,
    message: "Please input only letters",
  },
];

export const lastNameRules: Rule[] = [
  {
    required: true,
    message: "Please input your Last name!",
  },
  {
    min: 3,
    max: 20,
    message: "Please input more than 3 and less than 20 letters",
  },
  {
    pattern: Regexes.ONLY_LETTERS,
    message: "Please input only letters",
  },
];

export const emailRules: Rule[] = [
  {
    required: true,
    message: "Please input your email adress!",
  },
  {
    pattern: Regexes.EMAIL,
    message: "Please input valid email!",
  },
];

export const getEmailRulesWithCheck = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Rule[] => [
  ...emailRules,
  () => ({
    async validator(_, value: string) {
      if (!value.match(Regexes.EMAIL)) {
        return;
      }
      try {
        setIsLoading(true);
        const isEmailFree = await checkEmail(value);
        if (isEmailFree) {
          return Promise.resolve();
        } else {
          return Promise.reject(
            new Error("The Email that you entered is not free!")
          );
        }
      } catch (error) {
        return Promise.reject(new Error("Error while checking Email"));
      } finally {
        setIsLoading(false);
      }
    },
    validateTrigger: "onSubmit",
  }),
];

export const codeRules: Rule[] = [
  {
    required: true,
    message: "Please input your verification code!",
  },
  {
    min: 6,
    max: 6,
    pattern: Regexes.ONLY_DIGITS,
    message: "Please input 6 digit number!",
  },
];

export const passwordRules: Rule[] = [
  {
    required: true,
    message: "Please input your Password!",
  },
  {
    min: 8,
    max: 16,
    message: "Please input more than 8 and less than 16 letters",
  },
  {
    pattern: Regexes.PASSWORD,
    message:
      "Please input only letters, digits, or special characters from the set @$!%*?&",
  },
];

export const confirmRules: Rule[] = [
  {
    required: true,
    message: "Please confirm your password!",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The new password that you entered do not match!")
      );
    },
  }),
];
