import { OPENWEATHERMAP_API_KEY } from "@/constant/credentials";
import Toast from "react-native-toast-message";
import apiClient from "./apiClient";


const weatherApiKey = OPENWEATHERMAP_API_KEY;

export const weatherService = {
    getCurrentWeather: async (city: string) => {
        try {
            const response = await apiClient.get(`/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}`);
            return response;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: `error getting current weather details`,
                position: "top",
                visibilityTime: 1500,
            });
            throw err;
        }
    },
    getWeatherForcast: async (city: string) => {
        try {
            const response = await apiClient.get(`/forecast?q=${encodeURIComponent(city)}&appid=${weatherApiKey}`);
            return response;
        } catch (err) {
            Toast.show({
                type: "error",
                text1: `error getting current weather details`,
                position: "top",
                visibilityTime: 1500,
            });
            throw err;
        }
    }
}