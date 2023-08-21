import { useState } from "react";
import { Steps } from "antd";
import { RegisterForm } from "../../components/features/Register/RegisterForm";
import { EmailVerification } from "../../components/features/Register/EmailVerification";
import { stepsItems } from "../../utils/Auth/steps.items";
import { IRegisterRequest } from "../../utils/Auth/interfaces";
import scss from "./Register.module.scss";

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState(
    {} as IRegisterRequest
  );

  const handleUpdateRegitrationData = (newData: Partial<IRegisterRequest>) => {
    setRegistrationData((prev) => ({
      ...prev,
      ...newData,
      verification: {
        ...prev.verification,
        ...newData.verification,
      },
    }));
  };

  const onSubmitRegister = (values: IRegisterRequest) => {
    handleUpdateRegitrationData(values);
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className={scss.body}>
      <Steps
        current={currentStep}
        items={stepsItems}
        className={scss.steps}
      ></Steps>
      <div className={scss.box}>
        {currentStep === 0 && (
          <RegisterForm
            initialValues={{ ...registrationData }}
            onSubmit={onSubmitRegister}
          />
        )}
        {currentStep === 1 && (
          <EmailVerification
            registrationData={registrationData}
            handleGoBack={() => setCurrentStep(0)}
          />
        )}
      </div>
    </div>
  );
};
