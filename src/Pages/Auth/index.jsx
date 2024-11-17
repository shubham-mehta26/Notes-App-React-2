/* eslint-disable react/prop-types */
import { useState } from "react";
import { Radio } from "antd";
import RegisterForm from "src/Pages/Auth/Register";
import LoginForm from "src/Pages/Auth/Login";
import styles from "src/Pages/Auth/style.module.scss";

const options = [
  {
    label: "Register",
    value: "register",
  },
  {
    label: "Login",
    value: "login",
  },
];

const AuthPage = ({
  setUser,
  usersCollection,
  setUsersCollection,
  notificationApi,
}) => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div>
      <div className={styles.authHeading}>
        Notes App
      </div>
      <div>
        <Radio.Group
          block
          options={options}
          defaultValue="login"
          optionType="button"
          buttonStyle="solid"
          style={{ width: "50%", margin: "auto", marginBottom: "1rem" }}
          onChange={(value) => setIsLoginPage(value.target.value === "login")}
        />
      </div>
      <div className={styles.authForm}>
        <div className={styles.authFormHeading}><span>{isLoginPage ? "Login" : "Register"}</span></div>
        {isLoginPage ? (
          <LoginForm
            setUser={setUser}
              usersCollection={usersCollection}
              notificationApi={notificationApi}
          />
        ) : (
          <RegisterForm
            setUser={setUser}
            usersCollection={usersCollection}
            setUsersCollection={setUsersCollection}
            notificationApi={notificationApi}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
