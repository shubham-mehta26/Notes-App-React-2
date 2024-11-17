/* eslint-disable react/prop-types */
import { Tabs } from "antd";
import {
  BulbTwoTone,
  ClockCircleTwoTone,
  CloudTwoTone,
  DownCircleOutlined,
} from "@ant-design/icons";
import NotesHome from "src/Components/NotesHome";
import ArchivedNotes from "src/Components/ArchivedNotes";
import useLocalStorage from "src/hooks/useLocalstorage";
import styles from "src/Components/LeftNavbar/style.module.scss";

const LeftNavbar = ({ userName }) => {
  const [userNotes, setUserNotes] = useLocalStorage("userNotes", {});

  const leftNavbarTabs = [
    {
      label: (
        <div className={styles.leftNavbarTabItem}>
          <div>Notes</div>
          <BulbTwoTone />
        </div>
      ),
      key: "notes",
      children: (
        <NotesHome
          userName={userName}
          userNotes={userNotes}
          setUserNotes={setUserNotes}
        />
      ),
    },
    {
      label: (
        <div className={styles.leftNavbarTabItem}>
          <div>Archived</div>
          <DownCircleOutlined style={{ color: "rgb(22, 119, 255)" }} />
        </div>
      ),
      key: "archived",
      children: (
        <ArchivedNotes
          userName={userName}
          userNotes={userNotes}
          setUserNotes={setUserNotes}
        />
      ),
    },
    {
      label: (
        <div className={styles.leftNavbarTabItem}>
          <div>Clock</div>
          <ClockCircleTwoTone />
        </div>
      ),
      key: "clock",
      children: <div>Clock</div>,
    },
    {
      label: (
        <div className={styles.leftNavbarTabItem}>
          <div>Weather</div>
          <CloudTwoTone />
        </div>
      ),
      key: "weather",
      children: <div>Weather</div>,
    },
  ];
  return (
    <div className={styles.leftNavbar}>
      <Tabs tabPosition="left" items={leftNavbarTabs} />
    </div>
  );
};

export default LeftNavbar;
