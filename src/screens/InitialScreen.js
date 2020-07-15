import { useEffect } from 'react';
import { useAuth, tryLocalSignin } from '../context/AuthContext';

// The idea here is to have a top level component that does not actually return anything
// but runs the effect that checks if we already have a local session with a token and in this case
// redirects us directly to the track list screen
const InitialScreen = () => {
  const [, dispatch] = useAuth();

  useEffect(() => {
    tryLocalSignin(dispatch);
  }, []);

  return null;
};

export default InitialScreen;
