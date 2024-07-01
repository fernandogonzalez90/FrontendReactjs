import { useState } from "react";

export function usePost() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const post = async (url: string, data: object) => {
    setLoading(true);
    try {
      console.log("usepost!");
      const response = await fetch(`http://18.231.219.84:8000/api/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setResponse(responseData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { post, response, error, loading };
}
