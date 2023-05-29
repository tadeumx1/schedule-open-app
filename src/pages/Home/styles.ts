import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
`;

export const TitleErrorDescription = styled.Text`
  font-family: 'RobotoBold';
  color: #202125;
  font-size: 24px;
`;

export const LoadingHourData = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#000000',
})``;
