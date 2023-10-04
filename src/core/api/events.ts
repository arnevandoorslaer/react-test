import axios from 'axios';
import { Event } from '../types/event.type';

export const getEvents = async (filter?: string) => {
  const { data } = await axios.get(`http://localhost:3002/events/`);
  return data.map((event) => ({ ...event, key: event.id, dataIndex: event.id }));
};

export const addEvent = async (event: Event) => {
  axios.post<Event>(`http://localhost:3002/events/`, event);
};
export const deleteEvent = async (id: number) => {
  axios.delete<Event>(`http://localhost:3002/events/${id}`);
};
