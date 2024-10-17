import { Box, Grid, Typography } from "@mui/material";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import "./App.css";
import { ForecastItem, StyledPaper, TemperatureBox } from "./styles/styles";
import { useGetWeatherQuery } from "./api/apliSlice";
import { ForecastDay } from "./types/types";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import useGeolocation from "./hooks/useGeolocation";

const App = () => {
  const { position, error: geoError } = useGeolocation();

  const { data, error, isLoading } = useGetWeatherQuery({
    location: position ? `${position.latitude},${position.longitude}` : "Yazd",
  });

  if (geoError) return <Typography>Error with location: {geoError}</Typography>;
  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  const currentTemp: number | undefined = data?.current?.temp_c;
  const condition: string | undefined = data?.current?.condition?.text;
  const forecastDays: ForecastDay[] | undefined = data?.forecast?.forecastday;

  return (
    <Box sx={{ mt: 8 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <StyledPaper>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4">{data?.location.name}</Typography>
                <Typography variant="body2" color="inherit">
                  {data?.location.localtime && new Date(data.location.localtime).toLocaleDateString()}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  <ThunderstormIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  {condition}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <TemperatureBox>
                  <Typography variant="h3">{currentTemp}°</Typography>
                  <Typography variant="subtitle1">
                    {data?.forecast?.forecastday[0]?.day.mintemp_c}° / {data?.forecast?.forecastday[0]?.day.maxtemp_c}°
                  </Typography>
                </TemperatureBox>
              </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ mt: 2 }} justifyContent="center">
              {forecastDays &&
                forecastDays.slice(1).map((forecast: ForecastDay, index: number) => (
                  <ForecastItem item xs={4} sm={2} textAlign="center" key={index}>
                    <Typography variant="body1" color="inherit">
                      {new Date(forecast.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </Typography>
                    {forecast.day.condition.text.includes("Sunny") ? <WbSunnyIcon /> : <CloudIcon />}
                    <Typography variant="body2" color="inherit">
                      {forecast.day.mintemp_c}° / {forecast.day.maxtemp_c}°
                    </Typography>
                  </ForecastItem>
                ))}
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
