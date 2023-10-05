import './App.css';
import { Divider, notification } from 'antd';

import { useFormComponents } from './core/hooks/useFormComponent';
import { FormCreateComponent, FormUpdateComponent, HeaderComponent, OverviewComponent } from './core/components/';
import React from 'react';
import { createVisibleAtom, updateVisibleAtom } from './core/store/store';
import { useAtom } from 'jotai';

function App() {
  const formInfo = useFormComponents();

  const [isCreateVisible] = useAtom(createVisibleAtom);
  const [isUpdateVisible] = useAtom(updateVisibleAtom);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, description: string) => {
    api.open({ message, description, duration: 2 });
  };

  return (
    <>
      {contextHolder}
      <HeaderComponent></HeaderComponent>
      <Divider></Divider>
      <OverviewComponent></OverviewComponent>
      {isCreateVisible ? <FormCreateComponent columns={formInfo.data} openNotification={openNotification} /> : <></>}
      {isUpdateVisible ? <FormUpdateComponent columns={formInfo.data} openNotification={openNotification} /> : <></>}
    </>
  );
}

export default App;
