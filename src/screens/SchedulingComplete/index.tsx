import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ButtonConfirm } from '../../Components/ConfirmButton';

export function SchedulingComplete(){
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleConfirmRental(){
    navigation.navigate('Home');
  }
  
  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg
        width={width}
      />

      <Content>
        <DoneSvg width={80} height={80}/>
        <Title>Carro alugado</Title>
        

        <Message>
          Agora você só precisa ir {'\n'}
          até uma concessionária da RENTX {'\n'}
          pegar o seu automóvel
        </Message>
      </Content>

      <Footer>
        <ButtonConfirm onPress={handleConfirmRental} title="OK" />
      </Footer>
    </Container>
  );
}