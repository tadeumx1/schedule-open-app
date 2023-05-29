import { AxiosResponse } from 'axios';
import { api } from '../../client';
import { ScheduleResponse } from './types';

export const getRestaurantScheduleData =
  async (): Promise<ScheduleResponse> => {
    return api
      .get('/scheduleRestaurantWeekData')
      .then((response: AxiosResponse<ScheduleResponse>) => {
        const { data } = response;

        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
