import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import {
  ContainerHour,
  ContainerDayHour,
  ContainerTitle,
  Title,
  TitleDivider,
  ContainerTodayHour,
  TitleDay,
  TitleOpenTime,
  DescriptionHourDivider,
  DescriptionHour,
} from './styles';

import { DayRestaurantWeekFormat } from '../../pages/Home/useHome';

interface HourCardProps {
  hourRestaurantData: DayRestaurantWeekFormat[] | null;
}

const HourCard = ({ hourRestaurantData }: HourCardProps) => {
  const dayWeek = new Date()
    .toLocaleString('en-US', {
      weekday: 'long',
    })
    .toLowerCase();

  const dayWeekName = dayWeek.split(',')[0];

  const handleDayName = (dayName: string): string => {
    if (dayName) {
      const dayNameFormat = dayName.charAt(0).toUpperCase() + dayName.slice(1);

      return dayNameFormat;
    }

    return dayName;
  };

  const handleOpenHour = (itemDayHour: DayRestaurantWeekFormat): string => {
    if (itemDayHour.dayTime.length > 1) {
      return itemDayHour.dayTime
        .map((time) => {
          if (time.open === 'Closed' && time.closed === 'Closed') {
            return 'Closed';
          }

          return `${time.open} - ${time.closed}`;
        })
        .join(', ');
    } else {
      if (
        itemDayHour.dayTime[0].open === 'Closed' &&
        itemDayHour.dayTime[0].closed === 'Closed'
      ) {
        return 'Closed';
      }

      return `${itemDayHour.dayTime[0].open} - ${itemDayHour.dayTime[0].closed}`;
    }
  };

  return (
    <React.Fragment>
      <ContainerHour>
        <ContainerTitle>
          <MaterialIcons name="schedule" size={25} color="#A1A2A4" />
          <Title>Opening hours</Title>
        </ContainerTitle>
        <TitleDivider />
        {hourRestaurantData?.map((item) => {
          return (
            <React.Fragment key={item.day}>
              {dayWeekName !== item.day ? (
                <ContainerDayHour>
                  <TitleDay>{handleDayName(item.day)}</TitleDay>
                  <TitleOpenTime closed={handleOpenHour(item) === 'Closed'}>
                    {handleOpenHour(item)}
                  </TitleOpenTime>
                </ContainerDayHour>
              ) : (
                <ContainerDayHour>
                  <ContainerTodayHour>
                    <TitleDay>{handleDayName(item.day)}</TitleDay>
                    <DescriptionHour>TODAY</DescriptionHour>
                  </ContainerTodayHour>
                  <TitleOpenTime closed={handleOpenHour(item) === 'Closed'}>
                    {handleOpenHour(item)}
                  </TitleOpenTime>
                </ContainerDayHour>
              )}
              <DescriptionHourDivider />
            </React.Fragment>
          );
        })}
      </ContainerHour>
    </React.Fragment>
  );
};

export default HourCard;
