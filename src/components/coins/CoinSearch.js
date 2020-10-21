import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

const CoinSearch = ({onChange}) => {
    const [query, setQuery] = useState('');

    const handleText = (text) => {
        setQuery(text);

        if (onChange) {
            onChange(query);
        }
    };

    return (
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS === 'ios'
                        ? styles.textInputIOS
                        : styles.textInputAndroid,
                ]}
                onChangeText={handleText}
                value={query}
                placeholder="Search coin"
                placeholderTextColor="#fff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        paddingLeft: 5,
        color: Colors.white,
        fontSize: 16,
    },
    textInputAndroid: {
        borderWidth: 2,
        borderBottomColor: Colors.zircon,
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
        borderColor: Colors.white,
        borderWidth: 0.3,
        paddingLeft: 10,
    },
});

export default CoinSearch;
