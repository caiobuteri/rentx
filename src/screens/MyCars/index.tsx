import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/CarDTO';

import api from '../../services/api';

import { Car } from '../../Components/Car';
import { BackButton } from '../../Components/BackButton';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { Load } from '../../Components/Load';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [ cars, setCars ] = useState<CarProps[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars(){
      try{
        const { data } = await api.get('/schedules_byuser?user_id=10');
        setCars(data);
      } catch(error){
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars();
  }, []);

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        <BackButton onPress={handleBack} color={theme.colors.shape}/>
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {
        isLoading ?
        <Load /> :
      
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length < 10 ? "0" + cars.length : cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Period</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10   }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>

  );
}