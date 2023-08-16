import { useState, useEffect, useMemo } from "react";
import { Steps, Form, Result, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { RegisterForm } from "../../components/features/Register/RegisterForm";
import { EmailVerification } from "../../components/features/Register/EmailVerification";
import { register } from "../../services/auth.service";
import { getStepsItems } from "../../utils/Auth/steps.items";
import { ResultStatusType } from "antd/es/result";
import { IRegisterRequest } from "../../utils/Auth/interfaces";
import scss from "./Register.module.scss";

export const Register = () => {
  console.log("Register");
  const [form] = Form.useForm<IRegisterRequest>();

  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState(
    {} as IRegisterRequest
  );
  const [status, setStatus] = useState<ResultStatusType | "loading">("success");

  const stepsItems = useMemo(() => getStepsItems(status), [status]);

  const onSubmit = (values: any) => {
    if (values.confirm) {
      delete values.confirm;
    }
    setRegistrationData((prev) => ({ ...prev, ...values }));
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentStep === 2) {
      (async () => {
        try {
          setStatus("loading");
          const data = await register(registrationData);
          setStatus("success");
          console.log(data);
        } catch (error) {
          console.error(error);
          setStatus("error");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  return (
    <div className={scss.body}>
      <Steps
        current={currentStep}
        items={stepsItems}
        className={scss.steps}
      ></Steps>
      <div className={scss.box}>
        {currentStep === 0 && <RegisterForm form={form} onSubmit={onSubmit} />}
        {currentStep === 1 && (
          <EmailVerification
            email={registrationData.email}
            onSubmit={onSubmit}
          />
        )}
        {currentStep === 2 &&
          (status === "loading" ? (
            <Spin
              className={scss.loading}
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          ) : (
            <Result
              status={status as ResultStatusType}
              title={status}
              subTitle={`Registration ${
                status === "error" ? "fail" : status
              }ed`}
              extra={
                status === "error" ? (
                  <Button type="primary" onClick={() => setCurrentStep(0)}>
                    Go Back
                  </Button>
                ) : undefined
              }
            />
          ))}
      </div>
    </div>
  );
};
