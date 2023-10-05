import React from 'react';
import { render, screen } from '@testing-library/react';
import { OverviewComponent } from '../src/core/components';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => []),
}));

// Mock the useColumns, useEvents, and useFormComponents hooks
jest.mock('../src/core/hooks/useColumn', () => ({
  useColumns: jest.fn(() => ({
    data: [
      {
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        title: 'Title 2',
        description: 'Description 2',
      },
    ],
    isLoading: false,
    isError: false,
  })),
}));

jest.mock('../src/core/hooks/useEvent', () => ({
  useEvents: jest.fn(() => ({
    data: [
      {
        title: 'Event 1',
        description: 'Event Description 1',
      },
      {
        title: 'Event 2',
        description: 'Event Description 2',
      },
    ],
    isLoading: false,
    isError: false,
  })),
}));

test('Table gets filled with correct data onload', async () => {
  const [search, setSelected] = React.useState('');
  const [, setUpdateVisible] = React.useState();

  const { getByText } = render(<OverviewComponent setSelected={setSelected} setUpdateVisible={setUpdateVisible} search={search}></OverviewComponent>);

  // Check if data is present in the table
  expect(getByText('Title 1')).toBeInTheDocument();
  expect(getByText('Title 2')).toBeInTheDocument();
  expect(getByText('Event 1')).toBeInTheDocument();
  expect(getByText('Event 2')).toBeInTheDocument();
});
