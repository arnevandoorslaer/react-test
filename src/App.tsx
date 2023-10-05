import './App.css';
import { Table, Input, Button, Row, Col, Spin, Divider } from 'antd';
import { useColumns } from './core/hooks/useColumn';
import { useEvents } from './core/hooks/useEvent';
import { useFormComponents } from './core/hooks/useFormComponent';
import { useState, useEffect } from 'react';
import { FormCreateComponent, FormUpdateComponent } from './core/components/index';
import React from 'react';
import { Event } from './core/types/event.type';

function App() {
  const columnInfo = useColumns();
  const formInfo = useFormComponents();
  const eventInfo = useEvents();

  const { Search } = Input;

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState();

  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);

  useEffect(() => {
    setEvents(eventInfo.data);
  }, [eventInfo.data]);

  useEffect(() => {
    setEvents(
      search && search.trim() !== ''
        ? eventInfo.data?.filter((event: Event) => event.title.toLowerCase().includes(search.toLowerCase()) || event.description?.toLowerCase().includes(search.toLowerCase()))
        : eventInfo.data,
    );
  }, [search, eventInfo.data]);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  if (columnInfo.isLoading || eventInfo.isLoading) {
    return <Spin spinning></Spin>;
  }

  if (columnInfo.isError || eventInfo.isError) {
    return <>Something went wrong...</>;
  }

  const columns = columnInfo.data
    ? [
        ...columnInfo.data,
        {
          title: 'Actions',
          key: 'operation',
          render: (_, event) => (
            <a
              onClick={() => {
                setUpdateVisible(true);
                setSelected(event);
              }}
            >
              ...
            </a>
          ),
        },
      ]
    : [];

  return (
    <>
      <Row justify='space-between'>
        <Col span={8}>
          <Search onSearch={onSearch} allowClear placeholder={'Search events'} />
        </Col>
        <Col span={4}>
          <Button type='primary' style={{ background: 'black', borderRadius: 1 }} onClick={() => setCreateVisible(true)}>
            Create event
          </Button>
        </Col>
      </Row>
      <Divider></Divider>

      <Table dataSource={events} columns={columns} pagination={false} />
      {isCreateVisible ? <FormCreateComponent columns={formInfo.data} setVisible={setCreateVisible} /> : <></>}
      {isUpdateVisible ? <FormUpdateComponent columns={formInfo.data} setVisible={setUpdateVisible} selected={selected} /> : <></>}
    </>
  );
}

export default App;
