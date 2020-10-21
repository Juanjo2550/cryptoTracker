import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import Colors from '../../res/colors';
import ArrowUp from '../../assets/arrow_up.png';
import ArrowDown from '../../assets/arrow_down.png';

const CoinsItem = ({
    coin: {name, percent_change_1h, price_usd, symbol},
    onPress,
}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{name}</Text>
                <Text style={styles.nameText}>{symbol}</Text>
                <Text style={styles.priceText}>{`$${price_usd}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.percentText}>{percent_change_1h}</Text>
                <Image
                    style={styles.imageIcon}
                    source={percent_change_1h > 0 ? ArrowUp : ArrowDown}
                />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 0.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    row: {
        flexDirection: 'row',
    },
    symbolText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12,
    },
    nameText: {
        color: Colors.white,
        fontSize: 14,
        marginRight: 12,
    },
    percentText: {
        color: Colors.white,
        fontSize: 12,
        marginRight: 12,
    },
    priceText: {
        color: Colors.white,
        fontSize: 14,
    },
    imageIcon: {
        width: 22,
        height: 22,
    },
});

export default CoinsItem;
