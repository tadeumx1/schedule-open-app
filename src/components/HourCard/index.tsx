import React from 'react';

import {
  ContainerHour,
  ContainerDayHour,
  TitleScheduleIcon,
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
    const dayNameFormat = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    return dayNameFormat;
  };

  const handleOpenHour = (itemDayHour: DayRestaurantWeekFormat): string => {
    if (itemDayHour.dayTime.length > 1) {
      return itemDayHour.dayTime
        .map((time) => {
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
          <TitleScheduleIcon />
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
