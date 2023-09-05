import { useState, useMemo } from "react";
import { Button, Form, Input, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  confirmRules,
  getEmailRulesWithCheck,
  firstNameRules,
  lastNameRules,
  passwordRules,
} from "../../../../utils/Auth/form.rules";
import {
  IRegisterForm,
  IRegisterRequest,
} from "../../../../utils/Auth/interfaces";
import { verify } from "../../../../services/auth.service";

type RegisterFormProps = {
  initialValues?: IRegisterForm;
  onSubmit: (values: IRegisterRequest) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm<IRegisterRequest>();
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: IRegisterForm & { confirm?: string }) => {
    try {
      delete values["confirm"];
      setIsLoading(true);
      const token = await verify(values.email);
      onSubmit({ ...values, verification: { token, code: "" } });
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const emailRules = useMemo(() => getEmailRulesWithCheck(setIsLoading), []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ ...initialValues, confirm: initialValues?.password }}
    >
      <Form.Item name="firstName" rules={firstNameRules}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={lastNameRules}>
        <Input placeholder="lastName" />
      </Form.Item>
      <Form.Item name="email" rules={emailRules}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        rules={confirmRules}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Register
        </Button>
        <Button>
          <Link to="/auth/login" state={state}>
            Sign In
          </Link>
        </Button>
      </Space>
    </Form>
  );
};
