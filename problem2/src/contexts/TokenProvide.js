import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const TokenContext = createContext();

export const useTokens = () => useContext(TokenContext);

const TokenProvide = ({ children }) => {
  const [tokenList, setTokenList] = useState([]);
  const [priceMap, setPriceMap] = useState({});

  const fetchToken = useCallback(async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data = await response.json();
    // De-duplicate the data based on the latest date
    const latestData = data.reduce((acc, cur) => {
      if (
        !acc[cur.currency] ||
        new Date(cur.date) > new Date(acc[cur.currency].date)
      ) {
        acc[cur.currency] = cur;
      }
      return acc;
    }, {});

    // Format to token only array
    const tokens = Object.values(latestData).map(({ currency }) => ({
      currency,
    }));
    setTokenList(tokens);

    // Format to { [currency]: price } map object
    const prices = Object.fromEntries(
      Object.entries(latestData).map(([currency, { price }]) => [
        currency,
        price,
      ])
    );
    setPriceMap(prices);
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <TokenContext.Provider value={{ tokenList, priceMap }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvide;
