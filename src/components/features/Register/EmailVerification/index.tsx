import { useEffect, useState } from "react";
import { Button, Form, Statistic, Input, Space } from "antd";
import {
  IRegisterRequest,
  IVerificationForm,
} from "../../../../utils/Auth/interfaces";
import { verify } from "../../../../services/auth.service";
import { codeRules } from "../../../../utils/Auth/form.rules";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../redux/actionCreators/user.actionCreators";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/selectors";
import { requestStatus } from "../../../../utils/types/enums";

type EmailVerificationProps = {
  registrationData: IRegisterRequest;
  handleGoBack: () => void;
};

export const EmailVerification: React.FC<EmailVerificationProps> = ({
  registrationData,
  handleGoBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [token, setToken] = useState(registrationData.verification.token);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);

  const handleSendCode = async () => {
    try {
      setIsLoading(true);
      const token = await verify(registrationData.email);
      setToken(token);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = ({ code }: IVerificationForm) => {
    dispatch(
      registerUser({ ...registrationData, verification: { token, code } })
    );
  };

  useEffect(() => {
    if (status === requestStatus.ERROR) {
      form.setFields([
        {
          name: "code",
          errors: ["Registration failed"],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="code" rules={codeRules}>
        <Input placeholder="Verification Code" />
      </Form.Item>
      <Space>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading}
          loading={status === requestStatus.PENDING}
        >
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
