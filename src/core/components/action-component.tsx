import { useState } from 'react';
import { Input, Form, Select, Modal, Button } from 'antd';
import { FormComponentType } from '../types/form-component.type';
import { removeEvent } from '../hooks/useEvent';

function ActionComponent({ record }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate } = removeEvent();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = () => {
    mutate(record.id);
    setIsModalOpen(false);
  };

  return (
    <>
      <a onClick={showModal}>...</a>
      <Modal
        open={isModalOpen}
        footer={[
          <Button key='delete' danger onClick={handleDelete}>
            delete
          </Button>,
          <Button key='update' type='primary'>
            update
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        Choose action to perform on "{record.title}"
      </Modal>
    </>
  );
}

export default ActionComponent;
