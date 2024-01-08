import React from 'react';
import { BookRecord } from '../types';
import { useNavigate } from 'react-router-dom';

type TableProps = {
    records: BookRecord[];
    editRecord: (index: number) => void;
};
const Table: React.FC<TableProps> = ({ records, editRecord }) => {
    const navigate = useNavigate();

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published Date</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    <tr key={index}>
                        <td>{record.title}</td>
                        <td>{record.author}</td>
                        <td>{record.published_date}</td>
                        <td>{record.created_date}</td>
                        <td>{record.update_date}</td>
                        <td><button data-testid={'Edit'} onClick={() => { editRecord(index); navigate('/edit') }}>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
