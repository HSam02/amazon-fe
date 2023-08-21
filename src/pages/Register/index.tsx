import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Result, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { RegisterForm } from "../../components/features/Register/RegisterForm";
import { EmailVerification } from "../../components/features/Register/EmailVerification";
import { selectUser } from "../../redux/selectors";
import { registerUser } from "../../redux/actionCreators/user.actionCreators";
import { getStepsItems } from "../../utils/Auth/steps.items";
import { ResultStatusType } from "antd/es/result";
import { IRegisterForm, IRegisterRequest } from "../../utils/Auth/interfaces";
import scss from "./Register.module.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);

  const [currentStep, setCurrentStep] = useState(0);
  const [registrationData, setRegistrationData] = useState(
    {} as IRegisterRequest
  );

  const stepsItems = useMemo(() => getStepsItems(status), [status]);

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

  useEffect(() => {
    if (currentStep === 2) {
      dispatch(registerUser(registrationData));
    }
  }, [currentStep]);

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
            email={registrationData.email}
            defaultToken={registrationData.verification.token}
            onSubmit={handleUpdateRegitrationData}
            handleGoBack={() => setCurrentStep(0)}
          />
        )}
        {currentStep === 2 &&
          (status === "pending" ? (
            <Spin
              className={scss.loading}
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          ) : (
            <Result
              status={status as ResultStatusType}
              title="Error"
              subTitle="Registration failed"
              extra={
                <Button type="primary" onClick={() => setCurrentStep(0)}>
                  Go Back
                </Button>
              }
            />
          ))}
      </div>
    </div>
  );
};
