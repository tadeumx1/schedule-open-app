import { getRestaurantScheduleData } from './functions';
import axios from 'axios';
import { api } from '../../client';

const getRestaurantScheduleDataResponse = {
  monday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  tuesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  wednesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  thursday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  friday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  saturday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  sunday: [
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 },
  ],
};

jest.mock('../../client/api');

const mockedAxios = api as jest.Mocked<typeof axios>;

describe('getRestaurantScheduleData service', () => {
  it('should get restaurant schedule data result', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: getRestaurantScheduleDataResponse })
    );

    const response = await getRestaurantScheduleData();

    expect(response).toEqual(getRestaurantScheduleDataResponse);
  });

  it('should get restaurant schedule data when error return', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('error'))
    );

    await expect(getRestaurantScheduleData).rejects.toThrow('error');
  });
});
