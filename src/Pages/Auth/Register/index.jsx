/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd";
import styles from "src/Pages/Auth/Register/style.module.scss";

const RegisterForm = ({ setUser, usersCollection, setUsersCollection, notificationApi }) => {
  const [registerForm] = Form.useForm();

  const handleRegister = async () => {
    await registerForm.validateFields();
    const newUserName = registerForm.getFieldsValue().username;
    const newName = registerForm.getFieldsValue().name;
    const newPassword = registerForm.getFieldsValue().password;

    if (usersCollection.users.find((user) => user.username === newUserName)) {
      notificationApi.error({
        message: "Username already exists",
      });
      return;
    }
    setUser(["username"], newUserName);
    setUser(["name"], newName);
    setUser(["password"], newPassword);
    setUser(["isUserAvailable"], true);
    setUsersCollection(
      ["users"],
      [
        ...usersCollection.users,
        {
          username: newUserName,
          name: newName,
          password: newPassword,
        },
      ]
    );
    notificationApi.success({
      message: `Register successful, Logged in as ${newUserName}`,
    });
  };

  return (
    <>
      <Form
        form={registerForm}
        name="registerForm"
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
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
        <Button style={{ width: 160 }} type="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </>
  );
};
export default RegisterForm;
