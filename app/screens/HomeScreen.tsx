import { ForecastItem, WeatherNow } from '@/types/types';
import React, { useCallback, useEffect, useState } from 'react'; // core React imports
import {
    ActivityIndicator, // loading spinner
    FlatList, // pull-to-refresh
    Image, // stylesheet helper
    Keyboard, // list for forecast
    RefreshControl,
    SafeAreaView, // to show weather icons
    StyleSheet, // basic view container
    Text, // text component
    TextInput, // input field
    TouchableOpacity, // safe area wrapper for notches/status bar
    View, // basic view container
} from 'react-native'; // react-native components
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { toastConfig } from '../config/toastConfig';
import { weatherService } from '../services/WeatherService';
import WeatherCard from '../widgets/WeatherCard';

export const kelvinToCelsius = (k: number) => Math.round(k - 273.15); // returns integer Celsius

// Format date to readable string (e.g., Mon, Oct 24)
const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

// Group 3-hour forecast items into daily summaries (min/max)
const groupForecastToDays = (list: any[]): ForecastItem[] => {
    // accumulator by date string
    const groups: Record<string, { temps: number[]; icons: string[] }> = {};
    // iterate list (OpenWeatherMap 5-day returns 3h steps)
    list.forEach((item) => {
        const dateKey = new Date(item.dt_txt).toISOString().split('T')[0]; // YYYY-MM-DD
        if (!groups[dateKey]) groups[dateKey] = { temps: [], icons: [] };
        groups[dateKey].temps.push(item.main.temp);
        groups[dateKey].icons.push(item.weather[0].icon);
    });


    const result = Object.keys(groups)
        .slice(0, 6) // sometimes includes today + 5 days; we'll trim later
        .map((dateKey) => {
            const g = groups[dateKey];
            const minK = Math.min(...g.temps);
            const maxK = Math.max(...g.temps);
            const icon = g.icons[Math.floor(g.icons.length / 2)] || g.icons[0];
            return {
                date: formatDate(dateKey),
                temp_min: kelvinToCelsius(minK),
                temp_max: kelvinToCelsius(maxK),
                icon,
            } as ForecastItem;
        });

    // return up to next 5 days (exclude today's partial day to match expectations)
    return result.slice(1, 6); // return next 5 days (skip index 0 which is today)
};

const SearchBar: React.FC<{
    value: string;
    onChange: (v: string) => void;
    onSubmit: () => void;
    loading: boolean;
}> = ({ value, onChange, onSubmit, loading }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput} // input styles
                placeholder="Enter city name (e.g., London)" // guidance
                value={value} // controlled value
                onChangeText={onChange} // update parent
                onSubmitEditing={() => {
                    onSubmit(); // call search
                    Keyboard.dismiss(); // hide keyboard
                }}
                returnKeyType="search" // keyboard submit type
            />
            <TouchableOpacity style={styles.searchButton} onPress={onSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator /> // spinner while loading
                ) : (
                    <Text style={styles.searchButtonText}>Search</Text> // button label
                )}
            </TouchableOpacity>
        </View>
    );
};


const App: React.FC = () => {

    const [city, setCity] = useState<string>('');
    const [weatherNow, setWeatherNow] = useState<WeatherNow | null>(null);
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // fetch both current and forecast data for a city
    const fetchWeather = useCallback(
        async (searchCity: string) => {
            if (!searchCity || searchCity.trim().length === 0) {
                setError('Please enter a city name.');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const currentResp = await weatherService.getCurrentWeather(searchCity);
                //debugger;
                if (!currentResp.data) {
                    throw new Error('City not found or API error (current)');
                }
                const currentJson = currentResp.data;

                const forecastResp = await weatherService.getWeatherForcast(searchCity);
                if (forecastResp.status !== 200) {
                    throw new Error('City not found or API error (forecast)');
                }
                const forecastJson = await forecastResp.data;
                // debugger;

                setWeatherNow(currentJson as WeatherNow);
                const days = groupForecastToDays(forecastJson.list || []);
                setForecast(days);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch weather.'); // show error
                setWeatherNow(null);
                setForecast([]);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        []
    );

    const onSearch = () => {
        fetchWeather(city.trim());
    };


    const onRefresh = () => {
        if (!weatherNow) return;
        setRefreshing(true);
        fetchWeather(weatherNow.name);
    };

    useEffect(() => {
        const defaultCity = 'New Delhi';
        setCity(defaultCity);
        fetchWeather(defaultCity);
    }, [fetchWeather]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <Toast config={toastConfig} />
                <Text style={styles.title}>Weather App</Text>

                {/* Search bar component */}
                <SearchBar value={city} onChange={setCity} onSubmit={onSearch} loading={loading} />

                {/* Error message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Loading indicator when fetching first time */}
                {loading && !refreshing ? (
                    <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                ) : (
                    // content area (current + forecast)
                    <FlatList
                        data={forecast} // forecast days as data
                        keyExtractor={(item) => item.date}
                        ListHeaderComponent={<WeatherCard data={weatherNow} />} // show current at top
                        renderItem={({ item }) => (
                            <View style={styles.forecastItem}>
                                <Text style={styles.forecastDate}>{item.date}</Text>
                                <View style={styles.rowCenter}>
                                    <Image source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }} style={styles.smallIcon} />
                                    <Text style={styles.forecastTemp}>{item.temp_min}° / {item.temp_max}°</Text>
                                </View>
                            </View>
                        )}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        ListEmptyComponent={
                            !loading ? (
                                <View style={styles.emptyContainer}>
                                    <Text style={{ textAlign: 'center' }}>No forecast available. Try searching another city.</Text>
                                </View>
                            ) : null
                        }
                    />
                )}

                {/* Small footer note */}
                {/* <Text style={styles.footer}>Data from OpenWeatherMap • Replace API key in code</Text> */}
            </View>
        </SafeAreaView>
    );
};

export default App; // main export


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7ff',
        paddingHorizontal: wp('4%'), // ~16px
        paddingTop: hp('1.5%'), // ~10px
        // paddingVertical: wp('3%'),
    },
    viewContainer: {
        paddingHorizontal: wp("2%")
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
        marginTop: hp('5.5%'),
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

