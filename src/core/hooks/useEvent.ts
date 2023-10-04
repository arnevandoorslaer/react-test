import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getEvents, addEvent, deleteEvent } from '../api/events';

export function useEvents() {
  return useQuery({ queryKey: ['events'], queryFn: getEvents });
}

export function createEvent() {
  const queryClient = useQueryClient();

  return useMutation(addEvent, {
    onSuccess: () => {
      const message = 'success';
      console.log(message);
    },
    onError: () => {
      console.log('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
}

export function removeEvent() {
  const queryClient = useQueryClient();

  return useMutation(deleteEvent, {
    onSuccess: () => {
      const message = 'success';
      console.log(message);
    },
    onError: () => {
      console.log('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
}
