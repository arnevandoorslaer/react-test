import axios from 'axios';
import { Event } from '../types/event.type';

export const getEvents = async () => {
  const { data } = await axios.get(`http://localhost:3002/events/`);
  return data.map((event: Event) => ({ ...event, key: event.id, dataIndex: event.id }));
};

export const addOrUpdateEvent = async (event: Event) => {
  if (!event.id) {
    await axios.post<Event>(`http://localhost:3002/events/`, event);
  } else {
    await axios.put<Event>(`http://localhost:3002/events/${event.id}`, event);
  }
};
export const deleteEvent = async (id: number | string) => {
  await axios.delete<Event>(`http://localhost:3002/events/${id}`);
};
