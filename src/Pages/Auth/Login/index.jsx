/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Input } from "antd";
import styles from "src/Pages/Auth/Login/style.module.scss";

const LoginForm = ({ setUser, usersCollection, notificationApi }) => {
  const [loginForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    await loginForm.validateFields();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const username = loginForm.getFieldsValue().username;
    const password = loginForm.getFieldsValue().password;

    if (usersCollection.users.find((user) => user.username === username)) {
      const user = usersCollection.users.find(
        (user) => user.username === username
      );
      if (user.password === password) {
        setUser(["username"], user.username);
        setUser(["password"], user.password);
        setUser(["name"], user.name);
        setUser(["isUserAvailable"], true);
        notificationApi.success({
          message: "Login successful",
        });
      } else {
        notificationApi.error({
          message: "Incorrect password",
        });
      }
    } else {
      notificationApi.error({
        message: "User does not exists",
      });
      return;
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form
        form={loginForm}
        name="loginForm"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
      <div className={styles.formFooter}>
        <Button style={{ width: 160 }} type="primary" onClick={handleLogin} loading={isLoading}>
          Login
        </Button>
      </div>
    </>
  );
};
export default LoginForm;
