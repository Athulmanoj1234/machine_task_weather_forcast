export type WeatherNow = {
  name: string; 
  main: {
    temp: number; 
    temp_min: number; 
    temp_max: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[]; 
};

export type ForecastItem = {
  date: string; 
  temp_min: number; 
  temp_max: number; 
  icon: string; 
};