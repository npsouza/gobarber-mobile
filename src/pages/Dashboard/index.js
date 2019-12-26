import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import {Container, Title, List, Loading, NoAppointments} from './styles';
import Appointment from '~/components/Appointment';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(false);

  async function loadAppointments() {
    setIsLoadingAppointment(true);
    const response = await api.get('appointments');
    setIsLoadingAppointment(false);
    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        {isLoadingAppointment && <Loading />}

        {!isLoadingAppointment && appointments.length > 0 && (
          <List
            data={appointments}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              <Appointment onCancel={() => handleCancel(item.id)} data={item} />
            )}
          />
        )}

        {!isLoadingAppointment && appointments.length === 0 && (
          <NoAppointments>Você não possui nenhum agendamento</NoAppointments>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
