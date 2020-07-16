import { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

const useLocation = (callback = () => {}) => {
  const [error, setError] = useState();

  const watchLocation = async () => {
    try {
      const { granted } = await requestPermissionsAsync();

      if (!granted) {
        throw new Error('Location permission not granted');
      }

      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000, // get an updated location every second
          distanceInterval: 10, // or every 10 meters
        },
        // the expo-location watch function takes the callback that is called with the current location
        // as the second argument here, so we accept the callback an arg for the hook to send it back to the component
        callback,
      );
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    watchLocation();
  }, []);

  return { error };
};

export default useLocation;
