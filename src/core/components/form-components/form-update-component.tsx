import FormComponent from './form-component';
import { parseMomentArray, parseToMoment } from '../../utils/dateParser';
import { removeEvent, createOrUpdateEvent } from '../../hooks/useEvent';

import { Button } from 'antd';

function FormUpdateComponent({ columns, setVisible, selected, setSelected }) {
  // ...parseToMoment([selected.startDate, selected.endDate])

  return <FormComponent columns={columns} setVisible={setVisible} title='UPDATE EVENT' okText='Update' cancelText='Cancel' prefilled={{ ...selected, dates: [] }} showDelete={true} />;
}

export default FormUpdateComponent;
