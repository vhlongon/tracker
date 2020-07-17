import { useLocationContext, reset } from '../context/LocationContext';
import { useTrackContext, createTrack } from '../context/TrackContext';
import { navigate } from '../navigationRef';

// this is a useful pattern to manage communication between 2 different contexts
const useSaveTrack = () => {
  const [state, dispatchLocation] = useLocationContext();
  const [, dispatchTrack] = useTrackContext();
  const { locations, name } = state;

  const saveTrack = async () => {
    await createTrack(dispatchTrack, { locations, name });
    reset(dispatchLocation);
    navigate('TrackList');
  };

  return [saveTrack];
};

export default useSaveTrack;
