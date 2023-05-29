import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useGetRestaurantScheduleData } from '../../services/modules/time-restaurant/actions';
import Home from './index';

const hourRestaurantOpeningTimesResponse = {
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

const hourRestaurantOpenCloseAnotherDayTimeResponse = {
  monday: [],
  tuesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  wednesday: [],
  thursday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 },
  ],
  friday: [{ type: 'open', value: 36000 }],
  saturday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 36000 },
  ],
  sunday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 },
  ],
};

const hourRestaurantOpenCloseMoreTimesDayResponse = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [
    {
      type: 'open',
      value: 36000,
    },
    {
      type: 'close',
      value: 64800,
    },
  ],
  friday: [{ type: 'open', value: 64800 }],
  saturday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 32400 },
    { type: 'close', value: 39600 },
    { type: 'open', value: 57600 },
    { type: 'close', value: 82800 },
  ],
  sunday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
};

const hourRestaurantOpenCloseMoreTimesAnotherDayResponse = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [
    { type: 'open', value: 32400 },
    { type: 'close', value: 39600 },
    { type: 'open', value: 57600 },
    { type: 'close', value: 82800 },
  ],
  friday: [{ type: 'open', value: 64800 }],
  saturday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 32400 },
    { type: 'close', value: 39600 },
    { type: 'open', value: 57600 },
    { type: 'close', value: 82800 },
  ],
  sunday: [
    {
      type: 'open',
      value: 43200,
    },
    {
      type: 'close',
      value: 75600,
    },
  ],
};

jest.mock('../../services/modules/time-restaurant/actions');

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.useFakeTimers().setSystemTime(new Date('2023-05-16'));

const mockUseGetRestaurantScheduleData =
  useGetRestaurantScheduleData as jest.Mock;

describe('Home Component', () => {
  it('should render screen correct', async () => {
    mockUseGetRestaurantScheduleData.mockImplementation(() => {
      return {
        data: hourRestaurantOpeningTimesResponse,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
    });

    await waitFor(() => {
      const component = render(<Home />);

      expect(component).toMatchSnapshot();
    });
  });

  it('should render opening time restaurant when return data', async () => {
    mockUseGetRestaurantScheduleData.mockImplementation(() => {
      return {
        data: hourRestaurantOpeningTimesResponse,
        isError: false,
        isLoading: false,
        isSuccess: true,
      };
    });

    const { getByText, getAllByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText('Monday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[0]).toBeDefined();
      expect(getByText('TODAY')).toBeDefined();
      expect(getByText('Tuesday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[1]).toBeDefined();
      expect(getByText('Wednesday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[2]).toBeDefined();
      expect(getByText('Thursday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[3]).toBeDefined();
      expect(getByText('Friday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[4]).toBeDefined();
      expect(getByText('Saturday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[5]).toBeDefined();
      expect(getByText('Sunday')).toBeDefined();
      expect(getByText('12 AM - 9 PM')).toBeDefined();
    });
  });
});
