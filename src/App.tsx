import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookRecord } from './types';
import HomePage from './Screens/HomePage.tsx';
import EditFormPage from './Screens/EditFormPage.tsx';
import { ToastProvider } from 'react-toast-notifications';
const App: React.FC = () => {
  const [records, setRecords] = useState<BookRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<BookRecord | null>(null);
  const [success, setSuccess] = useState(false)
  const addRecord = (record: BookRecord) => {
    setRecords([...records, { ...record, created_date: new Date().toISOString(), update_date: new Date().toISOString() }]);
    setSuccess(true)
  };

  useEffect(() => {
    if (success) setTimeout(() => setSuccess(false), 500)
  }, [success])

  const editRecord = (index: number) => {
    setSelectedRecord(records[index]);
    setSuccess(false)
  };

  const updateRecord = (updatedRecord: BookRecord) => {
    const updatedRecords: BookRecord[] = records.map((record) =>
      record === selectedRecord
        ? { ...updatedRecord, update_date: new Date().toISOString() }
        : record
    );
    setRecords(updatedRecords);
    setSelectedRecord(null);
    setSuccess(true)
  };

  return (
    <Router>
      <ToastProvider>

        <Routes>
          <Route path="/" element={<HomePage addRecord={addRecord} records={records} success={success} editRecord={editRecord} />} />
          {selectedRecord && <Route path="/edit" element={<EditFormPage success={success} record={selectedRecord} updateRecord={updateRecord} />} />}
        </Routes>
      </ToastProvider>

    </Router>
  );
};

export default App;
