import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StatusBar, Image} from 'react-native';
import Colors from './src/res/colors';

import CoinStack from './src/components/coins/CoinsStack';
import FavoriteStack from './src/components/favorites/FavoritesStack';

const Tabs = createBottomTabNavigator();

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <NavigationContainer>
                <Tabs.Navigator
                    tabBarOptions={{
                        tintColor: '#fefefe',
                        style: {
                            backgroundColor: Colors.blackPearl,
                        },
                    }}>
                    <Tabs.Screen
                        name="Coins"
                        component={CoinStack}
                        options={{
                            tabBarIcon: ({size, color}) => (
                                <Image
                                    source={require('./src/assets/bank.png')}
                                    style={{
                                        tintColor: color,
                                        width: size,
                                        height: size,
                                    }}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="Favorites"
                        component={FavoriteStack}
                        options={{
                            tabBarIcon: ({size, color}) => (
                                <Image
                                    source={require('./src/assets/star.png')}
                                    style={{
                                        tintColor: color,
                                        width: size,
                                        height: size,
                                    }}
                                />
                            ),
                        }}
                    />
                </Tabs.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
