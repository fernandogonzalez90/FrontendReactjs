import { useEffect, useState } from "react";

export function useFetch(point: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://18.231.219.84:8000/api/${point}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return { data };
}
