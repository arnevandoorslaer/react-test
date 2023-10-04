import { Input, Form, Select, DatePicker } from 'antd';
import { FormComponentType } from '../../types/form-component.type';

function FormFieldComponent({ column }) {
  const component = getComponent(column.component, column);
  return (
    <Form.Item
      name={column.component === 'range_picker' ? 'dates' : column.name}
      label={column.label}
      key={column.key}
      rules={[
        {
          required: column.required,
          message: 'Please input the title of collection!',
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
        <Select>
          {column.options.map((option) => (
            <Option value={option.value} label={option.label} key={option.label}>
              <>{option.label}</>
            </Option>
          ))}
        </Select>
      );
      break;
    case 'range_picker':
      input = <RangePicker format={'YYYY-MM-DD'} />;
      break;
    case 'textarea':
      input = <Input.TextArea />;
      break;
    default:
      input = <Input />;
      break;
  }
  return input;
}

export default FormFieldComponent;
