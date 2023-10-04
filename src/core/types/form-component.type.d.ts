export type FormComponentType = {
  name: string;
  label: string;
  component: string;
  required?: boolean;
  options: [
    {
      label: string;
      value: string;
    },
  ];
  dataIndex: string;
  key: string;
  title: string;
};
