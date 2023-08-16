import { StepProps } from "antd";
import {
  LoadingOutlined,
  SolutionOutlined,
  UserOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { ResultStatusType } from "antd/es/result";

export const getStepsItems: (
  status: ResultStatusType | "loading"
) => StepProps[] = (status) => [
  {
    title: "Register Form",
    icon: <UserOutlined />,
  },
  {
    title: "Email Verification",
    icon: <SolutionOutlined />,
  },
  {
    title:
      status === "loading"
        ? "Pending"
        : status === "error"
        ? "Registration Failed"
        : "Successfuly Registered",
    icon:
      status === "loading" ? (
        <LoadingOutlined />
      ) : status === "error" ? (
        <FrownOutlined />
      ) : (
        <SmileOutlined />
      ),
  },
];
