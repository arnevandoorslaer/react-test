import FormComponent from './form-component';
import { parseToMoment } from '../../utils/dateParser';
import React from 'react';
import { useAtom } from 'jotai';
import { selectedEventAtom, updateVisibleAtom } from '../../store/store';

function FormUpdateComponent({ columns, openNotification }) {
  const [selected] = useAtom(selectedEventAtom);
  const [, setVisible] = useAtom(updateVisibleAtom);

  const { event } = selected;

  const dates = parseToMoment([event.startDate, event.endDate]);
  const preFilled = { ...event, dates };

  return (
    <FormComponent columns={columns} setVisible={setVisible} title='UPDATE EVENT' okText='Update' cancelText='Cancel' prefilled={preFilled} showDelete={true} openNotification={openNotification} />
  );
}

export default FormUpdateComponent;
