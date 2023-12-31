import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getEvents, addOrUpdateEvent, deleteEvent } from '../api/events';

export function useEvents() {
  return useQuery({ queryKey: ['events'], queryFn: getEvents });
}

export function createOrUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation(addOrUpdateEvent, {
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
    onError: () => {
      console.log('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
}
