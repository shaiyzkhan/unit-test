import React, { useEffect, useState } from 'react';
import { BookRecord } from '../types';
import { useToasts } from 'react-toast-notifications';


type FormProps = {
  addRecord: (record: BookRecord) => void;
  success: Boolean
};

const Form: React.FC<FormProps> = ({ addRecord, success }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published_date, setPublishedDate] = useState('');
  const { addToast } = useToasts();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addRecord({ title, author, published_date });
    setTitle('');
    setAuthor('');
    setPublishedDate('');
    addToast('Record added successfully', { appearance: 'success' });
  };

  return (
  <>
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text"
        data-testid='title'
        value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Author:</label>
      <input
        data-testid='author'
        type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

      <label>Published Date:</label>
      <input
        type="date"
        data-testid='published_date'
        value={published_date}
        onChange={(e) => setPublishedDate(e.target.value)}
      />
      <button
        id='Add Record'
        data-testid='Add Record'
        type="submit">Add Record</button>
    </form>
  </>
  );
};

export default Form;
