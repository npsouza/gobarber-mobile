import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#fff',
})`
  margin-top: 20px;
  align-self: center;
`;

export const NoAppointments = styled.Text`
  align-self: center;
  flex: 1;
  color: #fff;
  font-size: 18px;
  opacity: 0.5;
  padding: 30px;
  text-align: center;
`;
