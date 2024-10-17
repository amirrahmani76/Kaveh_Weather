import styled from "@emotion/styled";
import { Box, Grid, Paper } from "@mui/material";

export const StyledPaper = styled(Paper)({
  backgroundImage: 'url("https://unsplash.it/600/400?image=1043&blur")',
  backgroundSize: "cover",
  borderRadius: "16px",
  color: "#fff",
  overflow: "hidden",
  boxShadow: "25px 25px 40px rgba(0,0,0,0.33)",
  padding: "16px",
});

export const TemperatureBox = styled(Box)({
  textAlign: "center",
  "& .MuiTypography-h3": {
    fontSize: "2rem",
  },
});

export const ForecastItem = styled(Grid)({
  textAlign: "center",
});

