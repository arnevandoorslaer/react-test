import { Input, Button, Row, Col } from 'antd';
import { useAtom } from 'jotai';

import React from 'react';
import { createVisibleAtom, searchAtom } from '../store/store';

function HeaderComponent() {
  const { Search } = Input;

  const [, setSearch] = useAtom(searchAtom);
  const [, setCreateVisible] = useAtom(createVisibleAtom);

  return (
    <>
      <Row justify='space-between'>
        <Col span={5}>
          <Search onSearch={setSearch} allowClear placeholder={'Search events'} />
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
