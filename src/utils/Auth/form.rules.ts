import { Rule } from "antd/es/form";

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
    pattern: /^[A-Za-z]+$/,
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
    pattern: /^[A-Za-z]+$/,
    message: "Please input only letters",
  },
];

export const emailRules: Rule[] = [
  {
    required: true,
    message: "Please input your email adress!",
  },
  {
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Please input valid email!",
  },
];

export const codeRules: Rule[] = [
  {
    required: true,
    message: "Please input your verification code!",
  },
  {
    pattern: /^\d{6}$/,
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
    pattern: /^[A-Za-z\d@$!%*?&]+$/,
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
