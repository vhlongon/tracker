import { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

const useLocation = (shouldTrack, callback = () => {}) => {
  const [error, setError] = useState();

  useEffect(() => {
    let subscriber;
    const watchLocation = async () => {
      try {
        const { granted } = await requestPermissionsAsync();

        if (!granted) {
          throw new Error('Location permission not granted');
        }

        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000, // get an updated location every second
            distanceInterval: 10, // or every 10 meters
          },
          // the expo-location watch function takes the callback that is called with the current location
          // as the second argument here, so we accept the callback as arg for the hook to send it back to the component
          callback,
        );

        subscriber.current = sub;
      } catch (e) {
        setError(e);
      }
    };

    const removeSubscriber = () => {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    };

    if (shouldTrack) {
      watchLocation();
    } else {
      removeSubscriber();
    }

    return () => {
      removeSubscriber();
    };
  }, [shouldTrack, callback]);

  return { error };
};

export default useLocation;
