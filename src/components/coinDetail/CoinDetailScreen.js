import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    FlatList,
    Image,
    Pressable,
    SectionList,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../lib/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../lib/storage';

const CoinDetailScreen = (props) => {
    const [coin, setCoin] = useState({});
    const [markets, setMarkets] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const getCoinIcon = (name) => {
        if (name) {
            const fixedName = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${fixedName}.png`;
        }
    };

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const response = await Http.instance.get(url);
        console.log('response', response);
        setMarkets(response);
    };

    const getSections = (currentCoin) => {
        return [
            {
                title: 'Market Cap',
                data: [currentCoin.market_cap_usd],
            },
            {
                title: 'Volume 24h',
                data: [currentCoin.volume24],
            },
            {
                title: 'Change 24h',
                data: [currentCoin.percent_change_24h],
            },
        ];
    };

    const getFavorite = async (coinId) => {
        try {
            const key = `favorite-${coinId}`;
            const favoriteString = await Storage.instance.get(key);
            console.log(favoriteString);
            if (favoriteString !== null) {
                setIsFavorite(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useLayoutEffect(() => {
        (async () => {
            try {
                setCoin(props.route.params.coin);
                await getMarkets(coin.id);
                await getFavorite(coin.id);
                //Set custom title bar
                props.navigation.setOptions({title: coin.symbol});
            } catch (err) {
                console.error(err);
            }
        })();
    }, [coin.id, coin.symbol, props.navigation, props.route.params.coin]);

    const addFavorite = async () => {
        const stringCoin = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;
        const stored = await Storage.instance.store(key, stringCoin);
        if (stored) {
            setIsFavorite(true);
        }
    };

    const removeFavorite = () => {
        Alert.alert('Remove favorites', 'Are you sure?', [
            {
                text: 'cancel',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'remove',
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    const removed = await Storage.instance.remove(key);
                    if (removed) {
                        setIsFavorite(false);
                    }
                },
                style: 'destructive',
            },
        ]);
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.subHeaderContent}>
                    <Image
                        style={styles.iconImg}
                        source={{uri: getCoinIcon(coin.name)}}
                    />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <Pressable
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorite,
                        isFavorite
                            ? styles.btnFavoriteRemove
                            : styles.btnFavoriteAdd,
                    ]}>
                    <Text style={styles.btnText}>
                        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </Text>
                </Pressable>
            </View>
            <SectionList
                style={styles.section}
                sections={getSections(coin)}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({section}) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                )}
            />
            <Text style={styles.marketTitle}>Markets</Text>
            <FlatList
                style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({item}) => <CoinMarketItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        marginLeft: 9,
    },
    section: {
        maxHeight: 220,
    },
    iconImg: {
        width: 25,
        height: 25,
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: Colors.white,
        fontSize: 14,
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16,
    },
    marketTitle: {
        color: Colors.white,
        fontSize: 16,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine,
    },
    btnText: {
        color: Colors.white,
    },
});

export default CoinDetailScreen;
