import React from "react";
import { BookRecord } from "../types";
import { useNavigate } from "react-router-dom";

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
          <th>Created Date</th>
          <th>Updated Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td data-testid={`title-${index}`}>{record.title}</td>
            <td data-testid={`author-${index}`}>{record.author}</td>
            <td data-testid={`published_date-${index}`}>{record.published_date}</td>
            <td data-testid={`created_date-${index}`}>{record.created_date}</td>
            <td data-testid={`update_date-${index}`}>{record.update_date}</td>
            <td>
              <button
                data-testid={`Edit-${index}`}
                onClick={() => {
                  editRecord(index);
                  navigate("/edit");
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
