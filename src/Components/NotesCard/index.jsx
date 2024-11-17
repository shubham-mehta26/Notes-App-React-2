/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, message, Popconfirm, Tooltip } from "antd";
import {
  DownCircleOutlined,
  UpCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddNotesModal from "src/Components/AddNotesModal";
import styles from "src/Components/NotesCard/sytle.module.scss";
import DOMPurify from "dompurify";

const { Meta } = Card;

const NotesCard = ({ note, userName, userNotes, setUserNotes, status }) => {
  const [isAddNotesModalOpen, setIsAddNotesModalOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [editNotesMessageApi, editNotesMessageContextHolder] =
    message.useMessage();

  const sanitizedContent = note?.content
    ? DOMPurify.sanitize(note.content)
    : "";

  const handleDelete = (id) => {
    const newNotes = userNotes?.[userName]?.filter((note) => note.id !== id);
    setUserNotes([userName], newNotes);
    message.success("Note deleted successfully");
  };

  const handleArchive = (id, newStatus) => {
    const newNotes = userNotes?.[userName]?.map((note) =>
      note.id === id ? { ...note, status: newStatus } : note
    );
    setUserNotes([userName], newNotes);
    if (newStatus === "archived") {
      message.success("Note archived successfully");
    } else {
      message.success("Note unarchived successfully");
    }
  };

  const handleEdit = (id, status) => {
    if(status === "active"){
      setIsAddNotesModalOpen(true);
      setCurrentNoteId(id);
    }
  };

  return (
    <div className={styles.notesCard}>
      {editNotesMessageContextHolder}
      <AddNotesModal
        isAddNotesModalOpen={isAddNotesModalOpen}
        setIsAddNotesModalOpen={setIsAddNotesModalOpen}
        userName={userName}
        noteId={currentNoteId}
        userNotes={userNotes}
        setUserNotes={setUserNotes}
        addNotesMessageApi={editNotesMessageApi}
      />
      <div className={styles.notesCardHeader}>
        <Card
          style={{
            minHeight: "160px",
          }}
          actions={[
            <Tooltip
              key="archive"
              title={status === "archived" ? "Unarchive" : "Archive"}>
              {status !== "archived" ? (
                <DownCircleOutlined
                  onClick={() => handleArchive(note.id, "archived")}
                />
              ) : (
                <UpCircleOutlined
                  onClick={() => handleArchive(note.id, "active")}
                />
              )}
            </Tooltip>,
            <div key="edit" className={note.status === "active" ? '' : styles.nonEditable}>
              <Tooltip
                title={status === "active" ? "Edit" : "Cannot edit when archived"}>
                <EditOutlined
                onClick={() => handleEdit(note.id, note.status)}
                disabled={status !== "active"}
              />
            </Tooltip>
            </div>,
            <Tooltip key="delete" title="Delete">
              <Popconfirm
                title="Are you sure you want to delete this note?"
                onConfirm={() => handleDelete(note.id)}
                key="delete">
                <div className={styles.deleteIcon}>
                  <DeleteOutlined />
                </div>
              </Popconfirm>
            </Tooltip>,
          ]}>
          <Meta
            title={note?.title || "Untitled"}
            description={
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent,
                }}
              />
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default NotesCard;
