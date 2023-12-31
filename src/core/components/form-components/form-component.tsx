import { Form, Modal, Button, Alert } from 'antd';
import FormFieldComponent from './form-field-component';
import { createOrUpdateEvent, removeEvent } from '../../hooks/useEvent';
import { FormComponentType } from '../../types/form-component.type';
import { Event } from '../../types/event.type';
import { parseMomentArray } from '../../utils/dateParser';
import React, { useState } from 'react';

function FormComponent({ columns, setVisible, title, okText, cancelText, prefilled, showDelete, openNotification }) {
  const [form] = Form.useForm();

  const { mutate: mutateRemove } = removeEvent();
  const { mutate: mutateCreateOrUpdate } = createOrUpdateEvent();

  const [showError, setShowError] = useState(false);

  const handleDelete = () => {
    mutateRemove(prefilled.id);
    openNotification('Successfully deleted', prefilled.title);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    form.validateFields().then(
      () => {
        setVisible(false);
        form.submit();
      },
      () => setShowError(true),
    );
  };

  const handleSubmit = (values: Event) => {
    if (values) {
      const [startDate, endDate] = parseMomentArray(values.dates);
      const event = { ...values, startDate, endDate, id: prefilled?.id || undefined };
      delete event.dates;
      mutateCreateOrUpdate(event);
      if (prefilled?.id) {
        openNotification('Successfully updated', values.title);
      } else {
        openNotification('Successfully created', values.title);
      }
      setShowError(false);
    }
  };

  const fields = columns.map((column: FormComponentType) => <FormFieldComponent column={column} key={column.component} />);

  return (
    <Modal data-testid='modal' title={title} okText={okText} open={true} cancelText={cancelText} onOk={handleOk} onCancel={handleCancel}>
      <Form key={title} form={form} layout='vertical' onFinish={handleSubmit} initialValues={prefilled || undefined} children={fields}></Form>
      {showError ? <Alert type='error' message='There are errors in the form. Please correct them before saving.' /> : <></>}
      {showDelete ? (
        <Button key='delete' danger onClick={handleDelete} style={{ top: 35 }}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </Modal>
  );
}

export default FormComponent;
