import EditForm from "../components/EditForm";
import { BookRecord } from "../types";

type FormProps = {
    record: BookRecord;
    updateRecord: (record: BookRecord) => void;
    success: Boolean
};

const EditFormPage: React.FC<FormProps> = ({ record, updateRecord, success }) => {
    return <><EditForm record={record} updateRecord={updateRecord} success={success} /></>;
};

export default EditFormPage
