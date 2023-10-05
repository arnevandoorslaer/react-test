import React from 'react';
import { render, screen } from '@testing-library/react';
import { OverviewComponent } from '../src/core/components';
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

const eventData = [
  {
    title: 'Annual Charity Gala',
    type: 'charity',
    description: 'A fundraising gala to support charitable causes.',
    startDate: '2022-12-15',
    endDate: '2022-12-15',
    id: '11',
  },
  {
    title: 'Art Exhibition Opening Test',
    type: 'exhibition',
    description: 'The grand opening of an art exhibition showcasing local artists.',
    startDate: '2022-07-09',
    endDate: '2022-07-09',
    id: '14',
  },
];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => []),
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
}));

jest.mock('antd', () => {
  return {
    ...jest.requireActual('antd'),
    Table: jest.fn(({ columns, dataSource }) => (
      <div data-testid='table'>
        <div data-testid='columns'>{JSON.stringify(columns)}</div>
        <div data-testid='events'>{JSON.stringify(dataSource)}</div>
      </div>
    )),
  };
});

test('Table gets filled with correct data onload', async () => {
  render(<OverviewComponent></OverviewComponent>);

  expect(screen.getByTestId('table')).toBeInTheDocument();

  expect(screen.getByTestId('columns')).toBeInTheDocument();
  expect(screen.getByTestId('events')).toBeInTheDocument();

  expect(screen.getByTestId('columns').textContent).toBe(JSON.stringify([...columnData, { title: 'Actions', key: 'operation' }]));
  expect(screen.getByTestId('events').textContent).toBe(JSON.stringify(eventData));
});
