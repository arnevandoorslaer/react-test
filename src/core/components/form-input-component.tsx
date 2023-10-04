import { Input, Form, Select, DatePicker } from 'antd';
import { FormComponentType } from '../types/form-component.type';

function FormFieldComponent({ record }) {
  const component = getComponent(record.component, record);
  return (
    <Form.Item
      name={record.component === 'range_picker' ? 'dates' : record.name}
      label={record.label}
      key={record.key}
      rules={[
        {
          required: record.required,
          message: 'Please input the title of collection!',
        },
      ]}
    >
      {component}
    </Form.Item>
  );
}

function getComponent(component: string, record: FormComponentType) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  let input = <></>;

  switch (component) {
    case 'select':
      input = (
        <Select>
          {record.options.map((option) => (
            <Option value={option.value} label={option.label} key={option.label}>
              <>{option.label}</>
            </Option>
          ))}
        </Select>
      );
      break;
    case 'range_picker':
      input = <RangePicker />;
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
