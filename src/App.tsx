import './App.css';
import { Divider, notification } from 'antd';

import { useFormComponents } from './core/hooks/useFormComponent';
import { useState } from 'react';
import { FormCreateComponent, FormUpdateComponent, HeaderComponent, OverviewComponent } from './core/components/';
import React from 'react';

function App() {
  const formInfo = useFormComponents();

  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState();

  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api.open({ message, description, duration: 2 });
  };

  return (
    <>
      {contextHolder}
      <HeaderComponent setCreateVisible={setCreateVisible} setSearch={setSearch}></HeaderComponent>
      <Divider></Divider>
      <OverviewComponent setSelected={setSelected} setUpdateVisible={setUpdateVisible} search={search}></OverviewComponent>
      {isCreateVisible ? <FormCreateComponent columns={formInfo.data} setVisible={setCreateVisible} openNotification={openNotification} /> : <></>}
      {isUpdateVisible ? <FormUpdateComponent columns={formInfo.data} setVisible={setUpdateVisible} selected={selected} openNotification={openNotification} /> : <></>}
    </>
  );
}

export default App;
