import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import FavoritesEmptyState from './FavoriteEmptyState';
import Colors from '../../res/colors';
import Storage from '../../lib/storage';
import CoinsItem from '../coins/CoinsItem';

const FavoritesScreen = ({navigation}) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        (async () => {
            setFavorites(await getFavorites());
            navigation.addListener('focus', async () => {
                setFavorites(await getFavorites());
            });
        })();
    }, [navigation]);

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter((key) => key.includes('favorite-'));
            const favoritesCoins = await Storage.instance.multiGet(keys);
            return favoritesCoins.map((fav) => {
                return JSON.parse(fav[1]);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', {coin});
    };

    return (
        <View style={styles.container}>
            {!favorites ? (
                <FavoritesEmptyState />
            ) : (
                <View>
                    <FlatList
                        data={favorites}
                        renderItem={({item}) => (
                            <CoinsItem
                                coin={item}
                                onPress={() => handlePress(item)}
                            />
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    },
});

export default FavoritesScreen;
