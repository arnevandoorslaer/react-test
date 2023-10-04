import { useQuery } from 'react-query';
import { getFormComponents } from '../api/schema';

export function useFormComponents() {
  return useQuery('form-components', getFormComponents);
}
