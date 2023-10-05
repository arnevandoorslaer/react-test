import React from 'react';
import { render } from '@testing-library/react';
import { FormComponent } from '../src/core/components';
import { createColumns } from '../src/core/api/schema';

const columnData = createColumns([
  {
    name: 'title',
    label: 'Title',
    component: 'text',
    required: true,
  },
  {
    name: 'type',
    component: 'select',
    label: 'Type',
    options: [
      {
        label: 'Generic',
        value: 'generic',
      },
      {
        label: 'Holiday',
        value: 'holiday',
      },
    ],
  },
  {
    name: ['startDate', 'endDate'],
    component: 'range_picker',
    label: 'Date',
  },
  {
    name: 'description',
    label: 'Description',
    component: 'textarea',
  },
]);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => []),
}));

jest.mock('../src/core/hooks/useEvent', () => ({
  createOrUpdateEvent: jest.fn(() => ({})),
  removeEvent: jest.fn(() => ({})),
}));

test('Table gets filled with correct data onload', async () => {
  const openNotification = (message: string, description: string) => {
    console.log({ message, description });
  };
  const [, setVisible] = React.useState(true);

  render(<FormComponent columns={columnData} setVisible={setVisible} title='title' okText='ok' cancelText='cancel' prefilled={undefined} showDelete={false} openNotification={openNotification} />);
});
