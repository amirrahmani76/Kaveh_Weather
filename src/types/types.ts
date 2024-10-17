export interface WeatherCondition {
  text: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: WeatherCondition;
  };
}

export interface CurrentWeather {
  temp_c: number;
  condition: WeatherCondition;
}

export interface WeatherLocation {
  name: string;
  localtime: string;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}
