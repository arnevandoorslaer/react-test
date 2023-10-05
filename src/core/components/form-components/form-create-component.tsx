import FormComponent from './form-component';
import React from 'react';

function FormCreateComponent({ columns, setVisible }) {
  return <FormComponent columns={columns} setVisible={setVisible} title='CREATE EVENT' okText='Create' cancelText='Cancel' showDelete={false} prefilled={undefined} />;
}

export default FormCreateComponent;
