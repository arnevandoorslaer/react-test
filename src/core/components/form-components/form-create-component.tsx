import FormComponent from './form-component';
import { Button } from 'antd';

function FormCreateComponent({ columns, setVisible }) {
  return <FormComponent columns={columns} setVisible={setVisible} title='CREATE EVENT' okText='Create' cancelText='Cancel' showDelete={false} />;
}

export default FormCreateComponent;
