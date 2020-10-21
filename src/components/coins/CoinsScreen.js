import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import CoinsItem from './CoinsItem';
import Http from '../../lib/http';
import Colors from '../../res/colors';
import CoinSearch from './CoinSearch';

const CoinsScreen = ({navigation}) => {
    const [coins, setCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    //Equivalent to componentDidMount()
    useEffect(() => {
        (async () => {
            const response = await Http.instance.get(
                'https://api.coinlore.net/api/tickers/',
            );
            setCoins(response.data);
            setAllCoins(response.data);
            setLoading(false);
        })();
    }, []);

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', {coin});
    };

    const handleSearch = (query) => {
        const filteredCoins = allCoins.filter((coin) => {
            return (
                coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase())
            );
        });

        setCoins(filteredCoins);
    };

    return (
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch} />
            {loading ? (
                <ActivityIndicator
                    color="#fff"
                    size="large"
                    style={styles.loader}
                />
            ) : null}
            <FlatList
                data={coins}
                renderItem={({item}) => (
                    <CoinsItem coin={item} onPress={() => handlePress(item)} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
    },
    loader: {
        marginTop: 60,
    },
});

export default CoinsScreen;
