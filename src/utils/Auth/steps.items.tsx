import { StepProps } from "antd";
import {
  LoadingOutlined,
  SolutionOutlined,
  UserOutlined,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { requestStatus } from "../types/enums";

export const getStepsItems: (status: requestStatus) => StepProps[] = (
  status
) => [
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
      status === "pending"
        ? "Pending"
        : status === "error"
        ? "Registration Failed"
        : "Successfuly Registered",
    icon:
      status === "pending" ? (
        <LoadingOutlined />
      ) : status === "error" ? (
        <FrownOutlined />
      ) : (
        <SmileOutlined />
      ),
  },
];
