/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Row, Col } from "antd";
import NotesCard from "src/Components/NotesCard";
import styles from "src/Components/ArchivedNotes/style.module.scss";

const ArchivedNotes = ({ userName, userNotes, setUserNotes }) => {
  

  useEffect(() => {
    if (!Object.keys(userNotes).includes(userName)) {
      setUserNotes([userName], []);
    }
  }, [userName, userNotes, setUserNotes]);

  return (
    <div className={styles.notesHome}>
      <div className={styles.archivedNotesHomeBody}>
        <Row gutter={[16, 16]}>
          {(userNotes?.[userName] || [])
            .filter((note) => note.status === "archived")
            .map((note) => (
              <Col span={6} key={note.id}>
                <NotesCard
                  note={note}
                  userName={userName}
                  userNotes={userNotes}
                  setUserNotes={setUserNotes}
                  status="archived"
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default ArchivedNotes;
