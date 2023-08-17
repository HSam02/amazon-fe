import { Button, Form, FormInstance, Input, Space } from "antd";
import { Link } from "react-router-dom";
import {
  confirmRules,
  emailRulesWithCheck,
  firstNameRules,
  lastNameRules,
  passwordRules,
} from "../../../../utils/Auth/form.rules";
import { IRegisterForm } from "../../../../utils/Auth/interfaces";

type RegisterFormProps = {
  form: FormInstance<IRegisterForm>;
  onSubmit: (values: IRegisterForm) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  onSubmit,
}) => {
  return (
    <Form form={form} onFinish={onSubmit}>
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
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button>
          <Link to="/auth/login">Sign In</Link>
        </Button>
      </Space>
    </Form>
  );
};
