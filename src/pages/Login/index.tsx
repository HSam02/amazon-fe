import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { emailRules, passwordRules } from "../../utils/Auth/form.rules";
import { requestStatus } from "../../utils/types/enums";
import { ILoginRequest } from "../../utils/Auth/interfaces";
import {
  loginUser,
  setUserData,
} from "../../redux/actionCreators/user.actionCreators";
import { selectUser } from "../../redux/selectors";
import scss from "./Login.module.scss";

export const Login = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);

  const onSubmit = async (values: ILoginRequest) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (status === requestStatus.ERROR) {
      form.setFields([
        {
          name: "email",
          errors: ["Email or Password is incorrect"],
        },
        {
          name: "password",
          errors: ["Email or Password is incorrect"],
        },
      ]);
    }

    return () => {
      if (status === requestStatus.ERROR) {
        dispatch(setUserData(null));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
            <Button
              type="primary"
              htmlType="submit"
              loading={status === requestStatus.PENDING}
            >
              Log In
            </Button>
            <Button>
              <Link to="/auth/register">Sign Up</Link>
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};
