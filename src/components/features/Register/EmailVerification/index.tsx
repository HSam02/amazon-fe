import { useState } from "react";
import { Button, Form, Statistic, Input, Space } from "antd";
import { IVerificationForm } from "../../../../utils/Auth/interfaces";
import { verify } from "../../../../services/auth.service";
import { codeRules } from "../../../../utils/Auth/form.rules";

type EmailVerificationProps = {
  email: string;
  defaultToken: string;
  onSubmit: (values: any) => void;
  handleGoBack: () => void;
};

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  email,
  defaultToken,
  onSubmit,
  handleGoBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [token, setToken] = useState<string>(defaultToken);

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const token = await verify(email);
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
      verification: { token, code: values.code },
    });
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item rules={codeRules}>
        <Input placeholder="Verification Code" />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          Apply
        </Button>
        <Button onClick={handleGoBack}>Go Back</Button>
        <Button
          onClick={handleSendCode}
          type="text"
          disabled={isDisable}
          loading={isLoading}
        >
          Resend Code
        </Button>
        {isDisable && (
          <Statistic.Countdown
            value={Date.now() + 3 * 1000}
            format="m:ss"
            onFinish={() => setIsDisable(false)}
          />
        )}
      </Space>
    </Form>
  );
};
