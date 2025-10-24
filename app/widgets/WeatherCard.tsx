import { WeatherNow } from '@/types/types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { kelvinToCelsius } from '../screens/HomeScreen';

const WeatherCard: React.FC<{ data: WeatherNow | null }> = ({ data }) => {
    if (!data) return null; // nothing to display
    const iconId = data.weather[0]?.icon; // pick first icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`; 

    return (
        <View style={styles.card}>
            <Text style={styles.cityName}>{data?.name}</Text>
            <View style={styles.rowCenter}>
                <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
                <View>
                    <Text style={styles.tempText}>{kelvinToCelsius(data?.main.temp!)}°C</Text>
                    <Text style={styles.conditionText}>{data?.weather[0]?.description}</Text>
                </View>
            </View>
            <View style={styles.rowBetween}>
                <Text>High: {kelvinToCelsius(data?.main.temp_max!)}°C</Text>
                <Text>Low: {kelvinToCelsius(data?.main.temp_min!)}°C</Text>
                <Text>Humidity: {data?.main.humidity}%</Text>
            </View>
        </View>
    )
}

export default WeatherCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7ff',
        paddingHorizontal: wp('4%'), // ~16px
        paddingTop: hp('1.5%'), // ~10px
    },
    title: {
        fontSize: hp('3%'), // ~24px
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: hp('1.5%'), // ~12px
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    searchInput: {
        flex: 1,
        height: hp('5.5%'), // ~44px
        borderRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: wp('1.5%'),
    },
    searchButton: {
        marginLeft: wp('2%'),
        backgroundColor: '#4b7bec',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.2%'),
        borderRadius: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: hp('2%'),
    },
    errorText: {
        color: '#d9534f',
        textAlign: 'center',
        marginBottom: hp('1%'),
        fontSize: hp('1.8%'),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: wp('3%'),
        padding: wp('4%'),
        marginBottom: hp('1.5%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: wp('2%'),
    },
    cityName: {
        fontSize: hp('2.3%'),
        fontWeight: '700',
        marginBottom: hp('1%'),
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        marginTop: hp('1.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherIcon: {
        width: wp('20%'), // ~80px
        height: wp('20%'),
        marginRight: wp('3%'),
    },
    tempText: {
        fontSize: hp('3.2%'),
        fontWeight: '700',
    },
    conditionText: {
        textTransform: 'capitalize',
        opacity: 0.8,
        fontSize: hp('2%'),
    },
    forecastItem: {
        backgroundColor: '#fff',
        borderRadius: wp('2.5%'),
        padding: wp('3%'),
        marginBottom: hp('1.2%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 1,
    },
    forecastDate: {
        fontWeight: '600',
        fontSize: hp('2%'),
    },
    smallIcon: {
        width: wp('12%'), // ~48px
        height: wp('12%'),
        marginRight: wp('2%'),
    },
    forecastTemp: {
        fontWeight: '600',
        fontSize: hp('2%'),
    },
    emptyContainer: {
        marginTop: hp('2%'),
        alignItems: 'center',
    },
    footer: {
        textAlign: 'center',
        fontSize: hp('1.5%'),
        color: '#666',
        marginTop: hp('1.5%'),
        marginBottom: hp('1.5%'),
    },
});

