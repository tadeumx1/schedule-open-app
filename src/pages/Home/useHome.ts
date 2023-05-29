import { useCallback, useEffect, useState } from 'react';
import { useGetRestaurantScheduleData } from '../../services/modules/time-restaurant';
import {
  ScheduleResponse,
  HourDay,
} from '../../services/modules/time-restaurant/types';

interface DayWeekHour {
  open: number;
  closed: number;
}

interface DayWeekHourDescription {
  open: string;
  closed: string;
}

interface DayRestaurantWeek {
  day: string;
  dayTime: DayWeekHour;
}

interface DayRestaurantWeekString {
  day: string;
  dayTime: DayWeekHourDescription;
}

export interface DayRestaurantWeekFormat {
  day: string;
  dayTime: DayWeekHourDescription[];
}

export const useHome = () => {
  const [hourRestaurantData, setHourRestaurantData] = useState<
    DayRestaurantWeekFormat[] | null
  >(null);

  const { data, isError, isSuccess, isLoading } =
    useGetRestaurantScheduleData();

  const handleScheduleRestaurantData = useCallback(
    (dataScheduleResponse: ScheduleResponse): DayRestaurantWeek[] => {
      // Basically transform from a object to array that each day is an array that contains
      // the name of day and another array with the day opening time
      const dataScheduleValues = Object.entries(dataScheduleResponse);

      const daysWeek: DayRestaurantWeek[] = [];

      // This is looping through the array that contains days of the week
      dataScheduleValues.map((itemDay: [string, Array<HourDay>], index) => {
        // First position name of week
        const day = itemDay[0];

        // This second position an array with the opening time object of the day
        const openTime = itemDay[1];

        // This variable we will obtain if a restaurant has an opening time but no closing time
        let openingRestaurant = 0;

        // It is used to know if the restaurant is closed on that day
        if (openTime.length === 0) {
          daysWeek.push({
            day,
            dayTime: {
              open: 0,
              closed: 0,
            },
          });

          return;
        }

        // This is looping through the array that contains the opening time of each day
        openTime.forEach((item: HourDay) => {
          // This is to check if you the previous day time has an opening hour.
          if (openingRestaurant === 0) {
            if (item.type === 'open') {
              openingRestaurant = item.value || 0;
            }
          } else {
            if (item.type === 'close') {
              daysWeek.push({
                day,
                dayTime: {
                  open: openingRestaurant,
                  closed: item.value || 0,
                },
              });

              // We have to define a variable with zero here because daytime objects
              // that have closed property always have open time too
              openingRestaurant = 0;
            }
          }
        });

        // This is checking if some opening time doesn't have a closing time
        // And if dont have the next day time object is going to have the close time for that day
        if (openingRestaurant !== 0) {
          // Get the next day
          const nextDay = dataScheduleValues[index + 1];

          // Get first time of the next day
          // The index 1 is the array of daytime objects
          // And the index 0 is the first daytime
          const nextDayTime = nextDay[1][0];

          const nextDayFirstTime = nextDayTime.value;

          daysWeek.push({
            day,
            dayTime: {
              open: openingRestaurant,
              closed: nextDayFirstTime,
            },
          });
        }
      });

      return daysWeek;
    },
    []
  );

  const handleTransformSecondsHour = (timeSeconds: number) => {
    // It is get the hours using seconds
    const hours = Math.floor(timeSeconds / 3600);

    // This is defining the period using the 12 hours
    const period = hours >= 12 ? 'PM' : 'AM';

    // It is changing the hours from 24 format to 12 hours format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // This is used when the restaurant is closed
    if (timeSeconds === 0) {
      return String(0);
    }

    return `${formattedHours.toString()} ${period}`;
  };

  const handleDaysMoreOpenTime = (
    daysWeekDescription: DayRestaurantWeekString[]
  ) => {
    const mergedObjects: DayRestaurantWeekFormat[] = [];

    daysWeekDescription.forEach((item) => {
      const { day, dayTime } = item;

      // This findIndex will check if each day of the daysWeekDescription
      // array is in the mergedObjects array if not it is going
      // to add the day transforming the dayTime object in an array
      const existingIndex = mergedObjects.findIndex((obj) => obj.day === day);

      // In this line if the index is different from -1 that day
      // object already exists in the merged objects so add the dayTime
      if (existingIndex !== -1) {
        mergedObjects[existingIndex].dayTime.push(dayTime);
      } else {
        // In this line we are creating an object with day and dayTime in mergedObjects
        // Then if it returns -1 it will pass here and it means that need
        // to create the object
        mergedObjects.push({ day, dayTime: [dayTime] });
      }
    });

    return mergedObjects;
  };

  const handleScheduleItemDescription = useCallback(
    (daysWeek: DayRestaurantWeek[]) => {
      // This is transforming the seconds to day hour and handle when have day time closed
      const daysWeekDescription = daysWeek.map((item) => {
        if (item.dayTime.open === 0 && item.dayTime.closed === 0) {
          return {
            ...item,
            dayTime: {
              open: 'Closed',
              closed: 'Closed',
            },
          };
        }

        return {
          ...item,
          dayTime: {
            open: handleTransformSecondsHour(item.dayTime.open),
            closed: handleTransformSecondsHour(item.dayTime.closed),
          },
        };
      });

      // In the daysWeekDescription array when we have more than one opening time in day
      // it is repetaing the day with each day time so this function is going to remove
      // the repeated days and put one position for each day with an array of day time to
      // make easy to display this data
      const daysWeekFormat = handleDaysMoreOpenTime(daysWeekDescription);

      setHourRestaurantData(daysWeekFormat);
    },
    []
  );

  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      const daysWeek = handleScheduleRestaurantData(data);

      handleScheduleItemDescription(daysWeek);
    }
  }, [
    data,
    isSuccess,
    isLoading,
    handleScheduleRestaurantData,
    handleScheduleItemDescription,
  ]);

  return {
    hourRestaurantData,
    error: isError,
    isLoading,
  };
};
