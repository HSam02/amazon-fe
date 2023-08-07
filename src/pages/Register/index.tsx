import { Form, Input, Button, Space, Row, Col } from "antd";

export const Register = () => {
  const [form] = Form.useForm();
  // console.log(form);
  // console.log(form.values())
  const onSubmit = (values: any) => {
    // console.log(form[0].getFieldValue('code'))
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Form
        form={form}
        style={{
          width: "80vw",
          maxWidth: "600px",
          margin: "auto",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
            {
              min: 2,
              max: 15,
              message: "Please input more than 2 and less than 15 letters",
            },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Please input only letters",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
            {
              min: 3,
              max: 20,
              message: "Please input more than 3 and less than 20 letters",
            },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Please input only letters",
            },
          ]}
        >
          <Input placeholder="lastName" />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={10}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email adress!",
                  },
                  {
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please input valid email!",
                  },
                ]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="code"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your verification code!",
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: "Please input 6 digit number!",
                  },
                ]}
              >
                <Input placeholder="Verification Code" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                style={{ width: "100%" }}
                onClick={() => console.log(form.getFieldValue("code"))}
              >
                Verify
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 8,
              max: 16,
              message: "Please input more than 8 and less than 16 letters",
            },
            {
              pattern: /^[A-Za-z\d@$!%*?&]+$/,
              message:
                "Please input only letters, digits, or special characters from the set @$!%*?&",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};
