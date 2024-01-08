import Form from "../components/Form";
import Table from "../components/Table";
import { BookRecord } from "../types";

type FormProps = {
  addRecord: (record: BookRecord) => void;
  records: BookRecord[];
  editRecord: (index: number) => void;
  success: Boolean;
};

const HomePage: React.FC<FormProps> = ({ addRecord, records, editRecord, success }) => {
  return <>
    <Form addRecord={addRecord} success={success} />
    <Table records={records} editRecord={editRecord}></Table>  </>;
};

export default HomePage
