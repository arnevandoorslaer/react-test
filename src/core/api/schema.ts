import axios from 'axios';
import { Column } from '../types/column.type';
import { FormComponentType } from '../types/form-component.type';

export const getColumns = async () => {
  const { data } = await axios.get<Column[]>(`http://localhost:3002/schema/`);

  return data.flatMap((record) => {
    if (record.component === 'range_picker') {
      const s = { ...record, name: 'startDate', key: 'startDate', dataIndex: 'startDate', title: 'Start Date' };
      const e = { ...record, name: 'endDate', key: 'endDate', dataIndex: 'endDate', title: 'End Date' };
      return [s, e];
    } else if (!Array.isArray(record.name)) {
      return createColumn(record, record.name);
    } else {
      return record.name.map((name) => createColumn(record, name));
    }
  });
};

const createColumn = (record: Column, name: string) => {
  return { ...record, name, key: name, dataIndex: name, title: record.label };
};

export const getFormComponents = async () => {
  const { data } = await axios.get<FormComponentType[]>(`http://localhost:3002/schema/`);

  return data.map((record) => ({ ...record, key: record.name, dataIndex: record.name, title: record.label }));
};
