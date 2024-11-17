/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { message, Row, Col } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import NotesCard from "src/Components/NotesCard";
import AddNotesModal from "src/Components/AddNotesModal";
import styles from "src/Components/NotesHome/style.module.scss";

const NotesHome = ({ userName, userNotes, setUserNotes }) => {
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [addNotesMessageApi, addNotesMessageContextHolder] =
    message.useMessage();

  useEffect(() => {
    if (!Object.keys(userNotes).includes(userName)) {
      setUserNotes([userName], []);
    }
  }, [userName]);

  return (
    <div className={styles.notesHome}>
      {addNotesMessageContextHolder}
      {isAddNotesModalOpen && (
        <AddNotesModal
          isAddNotesModalOpen={isAddNotesModalOpen}
          setIsAddNotesModalOpen={setIsAddNotesModalOpen}
          userName={userName}
          noteId={null}
          userNotes={userNotes}
          setUserNotes={setUserNotes}
          addNotesMessageApi={addNotesMessageApi}
        />
      )}
      <div className={styles.notesHomeHeader}>
        <div
          className={styles.addNotesBar}
          onClick={() => setIsAddNotesModalOpen(true)}>
          <EditTwoTone />
          <div style={{ color: "#8c8c8c" }}>Add a note...</div>
        </div>
      </div>
      <div className={styles.notesHomeBody}>
        <Row gutter={[16, 16]}>
          {(userNotes?.[userName] || [])
            .filter((note) => note.status === "active")
            .map((note) => (
              <Col span={6} key={note.id}>
                <NotesCard
                  note={note}
                  userName={userName}
                  userNotes={userNotes}
                  setUserNotes={setUserNotes}
                  status="active"
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default NotesHome;
