import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'antd';
import { FormFieldComponent } from './index';
import { createEvent } from '../hooks/useEvent';
import { FormComponentType } from '../types/form-component.type';
import { Event } from '../types/event.type';
import { parseDateArray } from '../utils/dateParser';

function FormComponent({ columns, visible, setVisible }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const { mutate } = createEvent();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setVisible(false);
  };

  const handleOk = () => {
    if (form.getFieldsError().flatMap((item) => item.errors).length === 0) {
      setIsModalOpen(false);
      setVisible(false);
      form.submit();
    }
  };

  const handleSubmit = (values: Event) => {
    if (values) {
      const { startDate, endDate } = parseDateArray(values.dates);
      const event = { ...values, startDate, endDate };
      delete event.dates;
      mutate(event);
    }
  };

  useEffect(() => {
    setIsModalOpen(visible);
  }, [visible]);

  return (
    <>
      <Modal title='CREATE EVENT' okText='Create' cancelText='Cancel' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout='vertical' name='create_event_form' onFinish={handleSubmit}>
          {columns.map((record: FormComponentType) => (
            <FormFieldComponent record={record} key={record.component} />
          ))}
        </Form>
      </Modal>
    </>
  );
}

export default FormComponent;
