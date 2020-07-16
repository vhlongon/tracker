import { useState, useEffect, useRef } from 'react';

export default function useFetch({ manual = true, ...rest }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevUrl = useRef();

  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const d = await response.json();
      setData(d);
    } catch (e) {
      console.error(e);
      setError(e);
    }

    setLoading(false);
  };

  const { url, options } = rest;
  useEffect(() => {
    // Only refetch if url changes
    if (prevUrl.current === url) {
      return;
    }
    prevUrl.current = url;

    if (!manual) {
      fetchData(url, options);
    }
  }, [url, manual, options]);

  return { data, loading, error, refetch: fetchData };
}
