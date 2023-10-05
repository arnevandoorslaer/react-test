import { Input, Button, Row, Col } from 'antd';

import React from 'react';

function HeaderComponent({ setSearch, setCreateVisible }) {
  const { Search } = Input;

  const onSearch = (value: string) => {
    setSearch(value);
  };

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
    </>
  );
}

export default HeaderComponent;
