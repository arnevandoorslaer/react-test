import FormComponent from './form-component';
import { parseToMoment } from '../../utils/dateParser';
import React from 'react';

function FormUpdateComponent({ columns, setVisible, selected }) {
  const dates = parseToMoment([selected.startDate, selected.endDate]);
  const preFilled = { ...selected, dates };

  return <FormComponent columns={columns} setVisible={setVisible} title='UPDATE EVENT' okText='Update' cancelText='Cancel' prefilled={preFilled} showDelete={true} />;
}

export default FormUpdateComponent;
