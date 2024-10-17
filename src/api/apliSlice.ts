import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherResponse } from "../types/types";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weatherapi.com/v1",
  }),

  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, { location: string }>({
      query: ({ location }) => `forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}&days=6&aqi=no&alerts=no`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
