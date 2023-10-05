import React from 'react';
import FormComponent from './form-component';

function FormCreateComponent({ columns, setVisible, openNotification }) {
  return (
    <FormComponent columns={columns} setVisible={setVisible} title='CREATE EVENT' okText='Create' cancelText='Cancel' showDelete={false} prefilled={undefined} openNotification={openNotification} />
  );
}

export default FormCreateComponent;
