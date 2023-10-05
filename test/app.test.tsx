import React from 'react';
import { render, screen } from '@testing-library/react';
import FormComponent from '../src/core/components/form-components/form-component';

// Mock the useColumns, useEvents, and useFormComponents hooks
jest.mock('./../src/core/hooks/useColumn', () => ({
  useColumns: jest.fn(() => ({
    isLoading: false,
    isError: false,
    data: [
      // Define your mock column data here
    ],
  })),
}));

jest.mock('./../src/core/hooks/useEvent', () => ({
  useEvents: jest.fn(() => ({
    isLoading: false,
    isError: false,
    data: [
      // Define your mock event data here
    ],
  })),
}));

jest.mock('./../src/core/hooks/useFormComponent', () => ({
  useFormComponents: jest.fn(() => ({
    isLoading: false,
    isError: false,
    data: [
      // Define your mock form component data here
    ],
  })),
}));

test('Table gets filled with correct data onload', () => {
  render(<FormComponent columns={[]} setVisible={true} title='CREATE EVENT' okText='Create' cancelText='Cancel' showDelete={false} prefilled={undefined} />);
});
