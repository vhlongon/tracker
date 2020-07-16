import { useEffect } from 'react';

// not the useful since we do have NavigationEvents, but it is an alternative approach
const useWillFocus = (navigation, cb) => {
  useEffect(() => {
    cb();

    const listener = navigation.addListener('willFocus', () => {
      cb();
    });

    return () => {
      listener.remove();
    };
  }, [navigation, cb]);
};

export default useWillFocus;
