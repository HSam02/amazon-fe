import { useState } from "react";
import { Button, Form, Input } from "antd";
import { IChangePasswordRequest } from "../../../../utils/Auth/interfaces";
import { confirmRules, passwordRules } from "../../../../utils/Auth/form.rules";
import { changePassword } from "../../../../services/auth.service";

export const ChangePassword = () => {
  const [form] = Form.useForm<IChangePasswordRequest & { confirm: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: IChangePasswordRequest) => {
    try {
      setIsLoading(true);
      const { password, oldPassword } = values;
      const isChanged = await changePassword({ password, oldPassword });
      if (isChanged) {
        form.setFieldsValue({
          confirm: "",
          oldPassword: "",
          password: "",
        });
        alert("Password changed");
      } else {
        alert("Password not changed");
        form.setFields([
          {
            name: "oldPassword",
            errors: ["Old Password is incorrect"],
          },
        ]);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item name="oldPassword" rules={passwordRules}>
        <Input.Password placeholder="Old Password" />
      </Form.Item>
      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={confirmRules}
        dependencies={["password"]}
      >
        <Input.Password placeholder="Confirm New Password" />
      </Form.Item>
      <Button htmlType="submit" type="primary" loading={isLoading}>
        Change
      </Button>
    </Form>
  );
};
