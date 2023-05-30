import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HourCard from './index';

const hourRestaurantOpeningTimesResponse = [
  { day: 'monday', dayTime: [{ open: '10 AM', closed: '6 PM' }] },
  { day: 'tuesday', dayTime: [{ open: 'Closed', closed: 'Closed' }] },
  { day: 'wednesday', dayTime: [{ open: '10 AM', closed: '7 PM' }] },
  { day: 'thursday', dayTime: [{ open: '10 AM', closed: '6 PM' }] },
  { day: 'friday', dayTime: [{ open: '10 AM', closed: '6 PM' }] },
  { day: 'saturday', dayTime: [{ open: '10 AM', closed: '6 PM' }] },
  { day: 'sunday', dayTime: [{ open: '12 PM', closed: '9 PM' }] },
];

jest.useFakeTimers().setSystemTime(new Date('2023-05-16'));

describe('Hour Card Component', () => {
  it('should render correct', async () => {
    const component = render(
      <HourCard hourRestaurantData={hourRestaurantOpeningTimesResponse} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render opening time restaurant hour card when return data', async () => {
    const { getByText, getAllByText } = render(
      <HourCard hourRestaurantData={hourRestaurantOpeningTimesResponse} />
    );

    await waitFor(() => {
      expect(getByText('Monday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[0]).toBeDefined();
      expect(getByText('TODAY')).toBeDefined();
      expect(getByText('Tuesday')).toBeDefined();
      expect(getByText('Closed')).toBeDefined();
      expect(getByText('Wednesday')).toBeDefined();
      expect(getAllByText('10 AM - 7 PM')).toBeDefined();
      expect(getByText('Thursday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[1]).toBeDefined();
      expect(getByText('Friday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[2]).toBeDefined();
      expect(getByText('Saturday')).toBeDefined();
      expect(getAllByText('10 AM - 6 PM')[3]).toBeDefined();
      expect(getByText('Sunday')).toBeDefined();
      expect(getByText('12 PM - 9 PM')).toBeDefined();
    });
  });
});
