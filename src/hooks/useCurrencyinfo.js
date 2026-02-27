import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    fetch(`https://api.frankfurter.app/latest?from=${currency}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.rates);
      })
      .catch((error) => console.log("API Error:", error));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;