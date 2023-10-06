import { Input, Form, Select, DatePicker } from 'antd';
import { FormComponentType } from '../../types/form-component.type';
import React from 'react';

function FormFieldComponent({ column }) {
  const component = getComponent(column.component, column);
  return (
    <Form.Item
      name={column.component === 'range_picker' ? 'dates' : column.name}
      label={column.label}
      key={column.component}
      rules={[
        {
          required: column.required,
          message: 'Required',
        },
      ]}
    >
      {component}
    </Form.Item>
  );
}

function getComponent(component: string, column: FormComponentType) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  let input = <></>;

  switch (component) {
    case 'select':
      input = (
        <Select data-testid='select-type'>
          {column.options.map((option) => (
            <Option value={option.value} label={option.label} key={option.label}>
              <>{option.label}</>
            </Option>
          ))}
        </Select>
      );
      break;
    case 'range_picker':
      input = <RangePicker data-testid='range-picker-date' format={'YYYY-MM-DD'} style={{ width: '100%' }} role='range-picker' />;
      break;
    case 'textarea':
      input = <Input.TextArea data-testid='text-area-description' />;
      break;
    default:
      input = <Input data-testid='input' />;
      break;
  }
  return input;
}

export default FormFieldComponent;
