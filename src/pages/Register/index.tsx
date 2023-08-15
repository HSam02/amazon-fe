import { useState, useEffect } from "react";
import { Steps, Form } from "antd";
import { RegisterForm } from "../../components/features/Register/RegisterForm";
import { EmailVerification } from "../../components/features/Register/EmailVerification";
import { register } from "../../services/auth.service";
import { stepsItems } from "../../utils/Auth/steps.items";
import { IRegisterRequest } from "../../utils/Auth/interfaces";
import scss from "./Register.module.scss";

export const Register = () => {
  console.log("Register");
  const [form] = Form.useForm<IRegisterRequest>();

  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState(
    {} as IRegisterRequest
  );
  const [status, setStatus] = useState("idle");

  const onSubmit = (values: any) => {
    setRegistrationData((prev) => ({ ...prev, ...values }));
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentStep === 2) {
      (async () => {
        try {
          setStatus("loading");
          const data = await register(registrationData);
          setStatus("idle");
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
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
        style={{ width: "80vw", maxWidth: "600px", marginBottom: 20 }}
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
            <>loading</>
          ) : status === "error" ? (
            <>error</>
          ) : (
            <>successful</>
          ))}
      </div>
    </div>
  );
};
