import React, { useState } from 'react';
import { BookRecord } from '../types';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

type EditFormProps = {
  record: BookRecord;
  updateRecord: (record: BookRecord) => void;
  success: Boolean
};

const EditForm: React.FC<EditFormProps> = ({ success, record, updateRecord }) => {
  const [editedTitle, setEditedTitle] = useState(record.title);
  const [editedAuthor, setEditedAuthor] = useState(record.author);
  const [editedPublishedDate, setEditedPublishedDate] = useState(record.published_date);
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateRecord({
      title: editedTitle,
      author: editedAuthor,
      published_date: editedPublishedDate,
    });
    addToast('Record updated successfully', { appearance: 'success' });
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        data-testid='title'
        value={editedTitle}
        onChange={(e) => {
          setEditedTitle(() => e.target.value)
        }}
      />
      <label>Author:</label>
      <input
        type="text"
        data-testid='author'
        value={editedAuthor}
        onChange={(e) => setEditedAuthor(e.target.value)}
      />
      <label>Published Date:</label>
      <input
        type="date"
        data-testid='published_date'
        value={editedPublishedDate}
        onChange={(e) => setEditedPublishedDate(e.target.value)}
      />
      <button id='Update Record' data-testid='Update Record'
        type="submit">Update Record</button>
    </form>
  );
};

export default EditForm;
