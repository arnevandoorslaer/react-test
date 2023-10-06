import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { ConfigProvider, theme } from 'antd';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createColumns } from '../src/core/api/schema';

const formComponentData = [
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
].map((formComponent) => ({ ...formComponent, key: formComponent.name, dataIndex: formComponent.name, title: formComponent.label }));

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

const eventData = [
  {
    title: 'Annual Charity Gala',
    type: 'charity',
    description: 'A fundraising gala to support charitable causes.',
    startDate: '2022-12-15',
    endDate: '2022-12-15',
    id: '11',
    key: '1',
  },
  {
    title: 'Art Exhibition Opening Test',
    type: 'exhibition',
    description: 'The grand opening of an art exhibition showcasing local artists.',
    startDate: '2022-07-09',
    endDate: '2022-07-09',
    id: '14',
    key: '2',
  },
];

jest.mock('../src/core/hooks/useFormComponent', () => ({
  useFormComponents: jest.fn(() => ({
    data: formComponentData,
    isLoading: false,
    isError: false,
  })),
}));

jest.mock('../src/core/hooks/useColumn', () => ({
  useColumns: jest.fn(() => ({
    data: columnData,
    isLoading: false,
    isError: false,
  })),
}));

jest.mock('../src/core/hooks/useEvent', () => ({
  useEvents: jest.fn(() => ({
    data: eventData,
    isLoading: false,
    isError: false,
  })),
  createOrUpdateEvent: jest.fn(() => ({ mutate: jest.fn((object) => eventData.push(object)) })),
  removeEvent: jest.fn(() => ({})),
}));

const customRender = () => {
  const queryClient = new QueryClient();

  const app = (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.compactAlgorithm,
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  );

  return render(app);
};

describe('Form', () => {
  it('should throw an alert', async () => {
    const { getByTestId } = customRender();

    const button = getByTestId('create-button');

    fireEvent.click(button);

    const modal = getByTestId('modal');
    const modalButton = modal.getElementsByClassName('ant-btn-primary')[0];
    const closeButton = modal.getElementsByClassName('ant-modal-close')[0];

    act(() => {
      fireEvent.click(modalButton);
    });
    await waitFor(() => {
      expect(modal.getElementsByClassName('ant-alert-message')[0].innerHTML).toBe('There are errors in the form. Please correct them before saving.');
      fireEvent.click(closeButton);
    });
  });

  it('should get successfully submitted', async () => {
    const { getByTestId, getByRole } = customRender();

    const button = getByTestId('create-button');

    fireEvent.click(button);

    const title = getByTestId('input') as HTMLInputElement;

    const description = getByTestId('text-area-description') as HTMLInputElement;

    const modal = getByTestId('modal');
    const modalButton = modal.getElementsByClassName('ant-btn-primary')[0];

    fireEvent.change(title, { target: { value: 'TestTitle' } });
    fireEvent.change(description, { target: { value: 'TestDescription' } });

    act(() => {
      fireEvent.click(modalButton);
    });
    await waitFor(() => {
      expect(getByRole('alert').getElementsByClassName('ant-notification-notice-message')[0].innerHTML).toBe('Successfully created');
      expect(eventData.find((event) => event.title === 'TestTitle')).toBeTruthy();
    });
  });
});
