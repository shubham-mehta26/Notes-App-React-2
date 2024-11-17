/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Modal, Button, Typography } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from "uuid";

const { Paragraph } = Typography;

const AddNotesModal = ({
  isAddNotesModalOpen,
  setIsAddNotesModalOpen,
  userName,
  userNotes,
  noteId,
  setUserNotes,
  addNotesMessageApi,
}) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const editorRef = useRef(null);

  useEffect(()=>{
    if(noteId){
      const note = userNotes?.[userName]?.find((note)=>note.id === noteId);
      setNoteTitle(note?.title);
      setCurrentNote(note?.content);
    }
  }, [noteId, userName, userNotes]);

  const handleSave = async () => {
    if (editorRef.current) {
      setSaveLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const noteContent = editorRef.current.getContent();
      console.log(noteContent, 'xxx');
      let updatedNotes = [];
      // if note already exists, update it
      if (noteId) {
        updatedNotes = userNotes?.[userName]?.map((note) =>
          note.id === noteId
            ? { ...note, title: noteTitle, content: noteContent }
            : note
        );
      } else {
        // if note does not exist, add it
        updatedNotes = [
          ...userNotes?.[userName],
          {
            title: noteTitle,
            content: noteContent,
            id: uuidv4(),
            status: "active",
          },
        ];
      }
      addNotesMessageApi.success("Note saved successfully");
      setSaveLoading(false);
      setUserNotes([userName], updatedNotes);
      setIsAddNotesModalOpen(false);
    }
  };

  const handleModalOpen = () => {
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 100);
  };

  return (
    <Modal
      title={
        <Paragraph
          style={{ width: 400, margin: "8px 16px", fontSize: 20 }}
          editable={{
            tooltip: "Edit Title",
            onChange: setNoteTitle,
            triggerType: ["text", "icon"],
            autoSize: { maxRows: 2 },
          }}>
          {noteTitle || "Add a title"}
        </Paragraph>
      }
      open={isAddNotesModalOpen}
      onCancel={() => setIsAddNotesModalOpen(false)}
      afterOpenChange={(visible) => visible && handleModalOpen()}
      width={700}
      footer={
        <div style={{ display: "flex", gap: 8, flexDirection: "row-reverse" }}>
          <Button
            style={{ width: 160 }}
            type="primary"
            onClick={handleSave}
            loading={saveLoading}>
            Save
          </Button>
          <Button
            className="negative-button"
            style={{ width: 160 }}
            onClick={() => setIsAddNotesModalOpen(false)}>
            Cancel
          </Button>
        </div>
      }>
      <Editor
        apiKey="1ux3g6g7kl6zwyxqgw7ho2iztvg0u7y5kg0ao7ec04x29hnh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={currentNote}
        init={{
          height: 500,
          max_height: 500,
          overflow: "scroll",
          menubar: false,
          resize: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
    </Modal>
  );
};

export default AddNotesModal;
