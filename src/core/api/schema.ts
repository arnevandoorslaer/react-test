import axios from 'axios';
import { Column } from '../types/column.type';
import { FormComponentType } from '../types/form-component.type';

export const getColumns = async () => {
  const { data } = await axios.get<Column[]>(`http://localhost:3002/schema/`);

  return createColumns(data);
};

export const createColumns = (columns: any[]) => {
  return columns.flatMap((column) => {
    if (column.component === 'range_picker') {
      const s = { ...column, name: 'startDate', key: 'startDate', dataIndex: 'startDate', title: 'Start Date' };
      const e = { ...column, name: 'endDate', key: 'endDate', dataIndex: 'endDate', title: 'End Date' };
      return [s, e];
    } else if (!Array.isArray(column.name)) {
      return createColumn(column, column.name);
    } else {
      return column.name.map((name) => createColumn(column, name));
    }
  });
};

const createColumn = (column: Column, name: string) => {
  return { ...column, name, key: name, dataIndex: name, title: column.label };
};

export const getFormComponents = async () => {
  const { data } = await axios.get<FormComponentType[]>(`http://localhost:3002/schema/`);

  return data.map((formComponent) => ({ ...formComponent, key: formComponent.name, dataIndex: formComponent.name, title: formComponent.label }));
};
