import React from 'react';
import FormComponent from './form-component';
import { createVisibleAtom } from '../../store/store';
import { useAtom } from 'jotai';

function FormCreateComponent({ columns, openNotification }) {
  const [, setVisible] = useAtom(createVisibleAtom);

  return (
    <FormComponent columns={columns} setVisible={setVisible} title='CREATE EVENT' okText='Create' cancelText='Cancel' showDelete={false} prefilled={undefined} openNotification={openNotification} />
  );
}

export default FormCreateComponent;
