import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { emailRules, passwordRules } from "../../utils/Auth/form.rules";
import { ILoginRequest } from "../../utils/Auth/interfaces";
import { loginUser } from "../../redux/actionCreators/user.actionCreators";
import { selectUser } from "../../redux/selectors";
import scss from "./Login.module.scss";

export const Login = () => {
  const [form] = Form.useForm();
  
  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);

  const onSubmit = async (values: ILoginRequest) => {
    dispatch(loginUser(values));
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
            <Button
              type="primary"
              htmlType="submit"
              loading={status === "pending"}
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
