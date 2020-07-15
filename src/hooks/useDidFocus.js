import { useEffect } from 'react';

const useDidFocus = (navigation, cb) => {
  useEffect(() => {
    cb();

    const listener = navigation.addListener('didFocus', () => {
      cb();
    });

    return () => {
      listener.remove();
    };
  }, [navigation]);
};

export default useDidFocus;
