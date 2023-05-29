import { useQuery } from '@tanstack/react-query';

import { getRestaurantScheduleData } from './functions';

export const GET_RESTAURANT_SCHEDULE_DATA = 'getRestaurantScheduleData';

export const useGetRestaurantScheduleData = () =>
  useQuery([GET_RESTAURANT_SCHEDULE_DATA], getRestaurantScheduleData);
