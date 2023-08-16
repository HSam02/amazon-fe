import { useState } from "react";
import { Button, Form, Statistic, Input, Space } from "antd";
import { IVerificationForm } from "../../../../utils/Auth/interfaces";
import { verify } from "../../../../services/auth.service";
import { codeRules, emailRules } from "../../../../utils/Auth/form.rules";

type EmailVerificationProps = {
  email: string;
  onSubmit: (values: any) => void;
};

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  onSubmit,
}) => {
  console.log("EmailVerification");
  const [form] = Form.useForm<IVerificationForm>();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [token, setToken] = useState<string>("");

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const token = await verify(form.getFieldValue("email"));
      setToken(token);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = (values: IVerificationForm) => {
    onSubmit({
      email: values.email,
      verification: { token, code: values.code },
    });
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ email }}>
      <Form.Item name="email" rules={emailRules}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            defaultValue={email}
            disabled={!isEditing}
            placeholder="Email"
          />
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            disabled={isLoading || Boolean(token)}
          >
            {isEditing ? "Confirm" : "Change Email"}
          </Button>
          <Button
            type="primary"
            onClick={handleSendCode}
            loading={isLoading}
            disabled={isEditing || Boolean(token)}
          >
            Get Code
          </Button>
        </Space.Compact>
      </Form.Item>
      {token && (
        <Form.Item name="code" status="error" rules={codeRules}>
          <Space style={{ width: "100%" }}>
            <Input placeholder="Verification Code" />
            <Statistic.Countdown
              value={Date.now() + 2 * 60 * 1000}
              format="m:ss"
              onFinish={() => setToken("")}
            />
          </Space>
        </Form.Item>
      )}
      <Space>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isEditing || isLoading || !token}
        >
          Verify
        </Button>
      </Space>
    </Form>
  );
};
