import { Spin, Table, Tag } from 'antd';

import React, { useEffect, useState } from 'react';
import { useColumns } from '../hooks/useColumn';
import { useEvents } from '../hooks/useEvent';

import { Event } from '../types/event.type';

function OverviewComponent({ setUpdateVisible, setSelected, search }) {
  const columnInfo = useColumns();
  const eventInfo = useEvents();

  const [events, setEvents] = useState();

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
      ].map((column) => {
        if (column.title === 'Type') {
          return {
            ...column,
            render: (tag: string) => {
              let color = tag === 'holiday' ? 'geekblue' : 'green';
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            },
          };
        }
        return column;
      })
    : [];

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

  if (columnInfo.isLoading || eventInfo.isLoading || !columns) {
    return <Spin spinning></Spin>;
  }

  if (columnInfo.isError || eventInfo.isError) {
    return <>Something went wrong...</>;
  }

  return (
    <>
      <Table dataSource={events} columns={columns} pagination={false} />
    </>
  );
}

export default OverviewComponent;
