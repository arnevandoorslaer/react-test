import { Spin, Table, Tag } from 'antd';

import React from 'react';
import { useColumns } from '../hooks/useColumn';
import { useEvents } from '../hooks/useEvent';

import { Event } from '../types/event.type';
import { useAtom } from 'jotai';
import { searchAtom, selectedEventAtom, updateVisibleAtom } from '../store/store';

function OverviewComponent() {
  const columnInfo = useColumns();
  const eventInfo = useEvents();

  const [, setSelected] = useAtom(selectedEventAtom);
  const [, setUpdateVisible] = useAtom(updateVisibleAtom);

  const [search] = useAtom(searchAtom);

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
                setSelected({ event });
              }}
            >
              ...
            </a>
          ),
        },
      ].map((column) => {
        if (column.title === 'Type') {
          return {
            ...column,
            render: (tag: string) => {
              let color = tag === 'holiday' ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag} style={{ width: '100%', textAlign: 'center' }}>
                  {tag.toUpperCase()}
                </Tag>
              );
            },
          };
        }
        return column;
      })
    : [];

  const filterEvents = (search: string, events: Event[]) => {
    return search && search.trim() !== ''
      ? events?.filter((event: Event) => event.title.toLowerCase().includes(search.toLowerCase()) || event.description?.toLowerCase().includes(search.toLowerCase()))
      : events;
  };

  if (columnInfo.isLoading || eventInfo.isLoading || !columns) {
    return <Spin spinning></Spin>;
  }

  if (columnInfo.isError || eventInfo.isError) {
    return <>Something went wrong...</>;
  }

  return (
    <>
      <Table dataSource={filterEvents(search, eventInfo.data)} columns={columns} pagination={false} />
    </>
  );
}

export default OverviewComponent;
