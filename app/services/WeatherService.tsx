import { OPENWEATHERMAP_API_KEY } from "@/constant/credentials";
import apiClient from "./apiClient";


const weatherApiKey = OPENWEATHERMAP_API_KEY;

export const weatherService = {
    getCurrentWeather: async (city: string) => {
        try {
            const response = await apiClient.get(`/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}`);
            return response;
        } catch (err) {
            throw err;
        }
    },
    getWeatherForcast: async (city: string) => {
        try {
            const response = await apiClient.get(`/forecast?q=${encodeURIComponent(city)}&appid=${weatherApiKey}`);
            return response;
        } catch (err) {
            throw err;
        }
    }
}