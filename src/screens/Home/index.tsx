import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';

import Logo from '../../assets/logo.svg'
import { Car } from '../../Components/Car';

import api from '../../services/api';
import { Alert } from 'react-native';

import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../Components/Load';
import { useTheme } from 'styled-components';

export function Home(){
  const [ cars, setCars ] = useState<CarDTO[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigation = useNavigation();

  const theme = useTheme();
  
  useEffect(() => {
    async function fetchCars(){
      try {
        setIsLoading(true);
        const { data } = await api.get('/cars');
        setCars(data);

      } catch(error){
        console.log(error)
        Alert.alert("Não foi possível recuperar os dados");
      } finally {
        setIsLoading(false);
      }

    }

    fetchCars();
  }, [])

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenByCars(){
    navigation.navigate('MyCars')
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {
        isLoading ?
        <Load /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <MyCarsButton onPress={handleOpenByCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>

      </Container>
  );
}