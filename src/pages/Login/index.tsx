import { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { login } from "../../services/auth.service";
import { emailRules, passwordRules } from "../../utils/Auth/form.rules";
import { ILoginRequest } from "../../utils/Auth/interfaces";
import scss from "./Login.module.scss";

export const Login = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ILoginRequest) => {
    try {
      setIsLoading(true);
      const user = await login(values);
      console.log(user);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={scss.body}>
      <div className={scss.box}>
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name="email" rules={emailRules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={passwordRules}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Space
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Log In
            </Button>
            <Button>Sign Up</Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};
