/* eslint-disable react/prop-types */
import {
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Button } from "antd";
import styles from "src/Components/Navbar/style.module.scss";

const NavBar = ({ name, handleLogout, logoutLoading }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.userInfo}>
        <Avatar size="large" icon={<UserOutlined />} />
        {name}
      </div>
      <div>
        <Input
          style={{ width: 600 }}
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
        />
      </div>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        loading={logoutLoading}>
        Logout
      </Button>
    </div>
  );
};

export default NavBar;
