import { useQuery } from 'react-query';
import { getColumns } from '../api/schema';

export function useColumns() {
  return useQuery('columns', getColumns);
}
