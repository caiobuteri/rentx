import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../src/screens/Home';
import { CarDetails } from '../src/screens/CarDetails';
import { Scheduling } from '../src/screens/Scheduling';
import { SchedulingDetails } from '../src/screens/SchedulingDetails';
import { SchedulingComplete } from '../src/screens/SchedulingComplete';
import { MyCars } from '../src/screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
  return (
    <Navigator headerMode="none">
      <Screen 
        name="Home"
        component={Home}
      />
      <Screen 
        name="CarDetails"
        component={CarDetails}
      />
      <Screen 
        name="Scheduling"
        component={Scheduling}
      />
      <Screen 
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen 
        name="SchedulingComplete"
        component={SchedulingComplete}
      />
      <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}