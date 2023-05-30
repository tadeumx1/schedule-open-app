import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';

import { getRestaurantScheduleData } from './functions';
import { useGetRestaurantScheduleData } from './actions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

jest.mock('./functions');

const mockedGetRestaurantScheduleData = getRestaurantScheduleData as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
});

const wrapper = ({ children }: { children: React.ReactElement }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetRestaurantScheduleData hook', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('should get restaurant schedule data result', async () => {
    mockedGetRestaurantScheduleData.mockResolvedValue({
      data: getRestaurantScheduleDataResponse,
    });

    const { result } = renderHook(() => useGetRestaurantScheduleData(), {
      wrapper: wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual({
        data: getRestaurantScheduleDataResponse,
      });
    });
  });

  it('should return loading when get restaurant schedule data', async () => {
    mockedGetRestaurantScheduleData.mockResolvedValue({
      data: getRestaurantScheduleDataResponse,
    });

    const { result } = renderHook(() => useGetRestaurantScheduleData(), {
      wrapper: wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should get restaurant schedule data when error return', async () => {
    mockedGetRestaurantScheduleData.mockRejectedValue({
      error: {
        message: 'Error when returning data',
      },
    });

    const { result } = renderHook(() => useGetRestaurantScheduleData(), {
      wrapper: wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual({
        error: {
          message: 'Error when returning data',
        },
      });
    });
  });
});
