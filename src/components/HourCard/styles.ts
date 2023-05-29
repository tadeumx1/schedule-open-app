import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

interface TitleOpenTimeProps {
  closed?: boolean;
}

export const ContainerHour = styled.View`
  background-color: #ffffff;
  padding: 20px;
  shadow-color: #000;
  shadow-radius: 1px;
  shadow-opacity: 0.7;
  shadow-offset: 0px 1px;
  elevation: 5;
  min-width: 300px;
  border-radius: 5px;
  max-width: 350px;
`;

export const ContainerDayHour = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'RobotoBold';
  color: #202125;
  font-size: 24px;
  margin: 5px 0px;
  font-weight: bold;
`;

export const TitleDivider = styled.View`
  border-color: #202125;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin-bottom: 5px;
`;

export const DescriptionHourDivider = styled.View`
  border-color: #eeeeee;
  border-bottom-width: 1px;
`;

export const TitleDay = styled.Text`
  font-family: 'RobotoBlack';
  color: #202125;
  font-size: 16px;
  margin-right: 10px;
  font-weight: bold;
`;

export const TitleOpenTime = styled.Text<TitleOpenTimeProps>`
  font-family: System;
  color: #202125;
  font-size: 16px;
  margin-right: 10px;

  ${({ closed }) =>
    closed &&
    `
    color: #A1A2A4;
  `};
`;

export const TitleOpenDescription = styled.Text``;

export const TitleHour = styled.Text``;

export const ContainerTodayHour = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DescriptionHour = styled.Text`
  font-family: System;
  color: #5bcb02;
  font-size: 12px;
  font-weight: bold;
`;

export const LoadingHourData = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#000000',
})``;
