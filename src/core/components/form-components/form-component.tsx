import { Form, Modal, Button } from 'antd';
import FormFieldComponent from './form-field-component';
import { createOrUpdateEvent, removeEvent } from '../../hooks/useEvent';
import { FormComponentType } from '../../types/form-component.type';
import { Event } from '../../types/event.type';
import { parseMomentArray } from '../../utils/dateParser';
import React from 'react';

function FormComponent({ columns, setVisible, title, okText, cancelText, prefilled, showDelete }) {
  const [form] = Form.useForm();

  const { mutate: mutateRemove } = removeEvent();
  const { mutate: mutateCreateOrUpdate } = createOrUpdateEvent();

  const handleDelete = () => {
    mutateRemove(prefilled.id);
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
      (error) => {
        console.log(error);
      },
    );
  };

  const handleSubmit = (values: Event) => {
    if (values) {
      const [startDate, endDate] = parseMomentArray(values.dates);
      const event = { ...values, startDate, endDate, id: prefilled?.id || undefined };
      delete event.dates;
      mutateCreateOrUpdate(event);
    }
  };

  const fields = columns.map((column: FormComponentType) => <FormFieldComponent column={column} key={column.component} />);

  return (
    <Modal title={title} okText={okText} open={true} cancelText={cancelText} onOk={handleOk} onCancel={handleCancel}>
      <Form key={title} form={form} layout='vertical' onFinish={handleSubmit} initialValues={prefilled || undefined} children={fields}></Form>
      {showDelete ? (
        <Button key='delete' danger onClick={handleDelete}>
          Delete
        </Button>
      ) : (
        <></>
      )}
    </Modal>
  );
}

export default FormComponent;
