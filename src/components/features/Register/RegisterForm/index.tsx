import { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import {
  confirmRules,
  emailRulesWithCheck,
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

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: IRegisterForm) => {
    try {
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

  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Form.Item name="firstName" rules={firstNameRules}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={lastNameRules}>
        <Input placeholder="lastName" />
      </Form.Item>
      <Form.Item name="email" rules={emailRulesWithCheck}>
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
          <Link to="/auth/login">Sign In</Link>
        </Button>
      </Space>
    </Form>
  );
};
