import React from 'react';

import { useHome } from './useHome';

import { Container, TitleErrorDescription, LoadingHourData } from './styles';
import HourCard from '../../components/HourCard';

const Home = () => {
  const { hourRestaurantData, error, isLoading } = useHome();

  return (
    <Container>
      {isLoading && <LoadingHourData />}
      {error && (
        <TitleErrorDescription>Something wrong occurred</TitleErrorDescription>
      )}
      <HourCard hourRestaurantData={hourRestaurantData} />
    </Container>
  );
};

export default Home;
