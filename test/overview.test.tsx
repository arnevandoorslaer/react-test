import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OverviewComponent } from '../src/core/components';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => []),
}));

jest.mock('../src/core/hooks/useColumn', () => ({
  useColumns: jest.fn(() => ({
    data: [
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
    ],
    isLoading: false,
    isError: false,
  })),
}));

jest.mock('../src/core/hooks/useEvent', () => ({
  useEvents: jest.fn(() => ({
    data: [
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
    ],
    isLoading: false,
    isError: false,
  })),
}));

test('Table gets filled with correct data onload', async () => {
  const [search, setSelected] = React.useState('');
  const [, setUpdateVisible] = React.useState();

  const { getByTestId, rerender } = render(<OverviewComponent setSelected={setSelected} setUpdateVisible={setUpdateVisible} search={search}></OverviewComponent>);

  // rerender(<OverviewComponent setSelected={setSelected} setUpdateVisible={setUpdateVisible} search={search}></OverviewComponent>);
  // Check if data is present in the table
});
