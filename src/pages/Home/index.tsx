import React from 'react';

import { useHome } from './useHome';

import { Container, TitleErrorDescription, LoadingHourData } from './styles';
import HourCard from '../../components/HourCard';

const Home = () => {
  const { hourRestaurantData, isLoading, error, isSuccess } = useHome();

  return (
    <Container>
      {isLoading && <LoadingHourData testID="loading-restaurant-hour" />}
      {error && (
        <TitleErrorDescription>Something wrong occurred</TitleErrorDescription>
      )}
      {isSuccess && <HourCard hourRestaurantData={hourRestaurantData} />}
    </Container>
  );
};

export default Home;
