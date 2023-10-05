import './App.css';
import { Divider } from 'antd';

import { useFormComponents } from './core/hooks/useFormComponent';
import { useState } from 'react';
import { FormCreateComponent, FormUpdateComponent, HeaderComponent, OverviewComponent } from './core/components/index';
import React from 'react';

function App() {
  const formInfo = useFormComponents();

  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState();

  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);

  return (
    <>
      <HeaderComponent setCreateVisible={setCreateVisible} setSearch={setSearch}></HeaderComponent>
      <Divider></Divider>
      <OverviewComponent setSelected={setSelected} setUpdateVisible={setUpdateVisible} search={search}></OverviewComponent>
      {isCreateVisible ? <FormCreateComponent columns={formInfo.data} setVisible={setCreateVisible} /> : <></>}
      {isUpdateVisible ? <FormUpdateComponent columns={formInfo.data} setVisible={setUpdateVisible} selected={selected} /> : <></>}
    </>
  );
}

export default App;
