import { useLocationContext, reset } from '../context/LocationContext';
import { createTrack } from '../context/TrackContext';
import { navigate } from '../navigationRef';

// this is a useful pattern to manage communication between 2 different contexts
const useSaveTrack = () => {
  const [state, dispatchLocation] = useLocationContext();
  const { locations, name } = state;

  const saveTrack = async () => {
    await createTrack({ locations, name });
    reset(dispatchLocation);
    navigate('TrackList');
  };

  return [saveTrack];
};

export default useSaveTrack;
