import { useState, useEffect } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const useGeolocation = (options?: GeolocationOptions) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setError(null);
    };

    const handleError = (err: GeolocationPositionError) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case err.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case err.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy: options?.enableHighAccuracy || true,
      timeout: options?.timeout || 10000,
      maximumAge: options?.maximumAge || 0,
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geoOptions);
  }, [options]);

  return { position, error };
};

export default useGeolocation;
