# Problem 3

## Datasource class Implementation

```ts
class Datasource {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices() {
    const response = await fetch(this.url);
    const data = await response.json();

    // Convert array into object { [currency]: price }
    const prices: { [key: string]: number } = data.reduce(
      (
        acc: { [key: string]: number },
        cur: { currency: string; price: number }
      ) => {
        acc[cur.currency] = cur.price;
        return acc;
      },
      {}
    );
    return prices;
  }
}
```

---

## Issues and Solutions

### Issue 1: Incorrect syntax `console.err()` in `useEffect`.

Solution: The correct syntax is below.

```ts
console.error();
```

### Issue 2: Using `any` for the `blockchain` parameter is unsafe in `getPriority`

Solution: Replace `any` type with `Blockchain` enum and use a map object.

```ts
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

const getPriority = (blockchain: Blockchain): number => {
  const priorityMap: Record<Blockchain, number> = {
    [Blockchain.Osmosis]: 100,
    [Blockchain.Ethereum]: 50,
    [Blockchain.Arbitrum]: 30,
    [Blockchain.Zilliqa]: 20,
    [Blockchain.Neo]: 20,
  };
  return priorityMap[blockchain] ?? -99;
};
```

### Issue 3: The `WalletBalance` interface is missing the `blockchain` property, but it's used in `getPriority()` during filtering/sorting to get the priority.

Solution: Add the `blockchain` property to `WalletBalance`.

```ts
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
```

### Issue 4: Undefined Variable `lhsPriority` in `sortedBalances`

Solution: Should use the `balancePriority` variable.

```ts
if (balancePriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
```

### Issue 5: Inefficient sorting and filtering in `sortedBalances` and unused dependency `prices`

Solution: Separate filtering and sorting into distinct variable and simplified the code.

```ts
// Simpliy condition
const filteredBalances = useMemo(() => {
  return balances.filter(
    (balance: WalletBalance) =>
      getPriority(balance.blockchain) > -99 && balance.amount <= 0
  );
}, [balances]);

// Sorting numbers in ascending order
const sortedBalances = useMemo(() => {
  return [...filteredBalances].sort(
    (lhs: WalletBalance, rhs: WalletBalance) =>
      getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
  );
}, [filteredBalances]);
```

### Issue 6: The `rows` map uses `sortedBalances` instead of `formattedBalances`, which does not include the `formatted` property.

Solution: Using `formattedBalances` ensures TypeScript recognizes `formatted` as required.

```ts
const rows = formattedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  }
);
```

### Issue 7: `prices` type is implicitly `any` since is defined as an `{}` without a proper type.

Solution: Explicitly define the type for `prices`.

```ts
const [prices, setPrices] = useState<{ [key: string]: number }>({});
```

---

## Refactored Version of the Code

```ts
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

class Datasource {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices() {
    const response = await fetch(this.url);
    const data = await response.json();

    const prices: { [key: string]: number } = data.reduce(
      (
        acc: { [key: string]: number },
        cur: { currency: string; price: number }
      ) => {
        acc[cur.currency] = cur.price;
        return acc;
      },
      {}
    );
    return prices;
  }
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Fetch data using async/await
    const fetchPrices = async () => {
      try {
        const datasource = new Datasource(
          "https://interview.switcheo.com/prices.json"
        );
        const data = await datasource.getPrices();
        setPrices(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrices();
  }, []);

  const getPriority = (blockchain: Blockchain): number => {
    const priorityMap: Record<Blockchain, number> = {
      [Blockchain.Osmosis]: 100,
      [Blockchain.Ethereum]: 50,
      [Blockchain.Arbitrum]: 30,
      [Blockchain.Zilliqa]: 20,
      [Blockchain.Neo]: 20,
    };
    return priorityMap[blockchain] ?? -99;
  };

  const filteredBalances = useMemo(() => {
    return balances.filter(
      (balance: WalletBalance) =>
        getPriority(balance.blockchain) > -99 && balance.amount <= 0
    );
  }, [balances]);

  const sortedBalances = useMemo(() => {
    return [...filteredBalances].sort(
      (lhs: WalletBalance, rhs: WalletBalance) =>
        getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
    );
  }, [filteredBalances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // Handle currency not found error
      const usdValue = (prices?.[balance.currency] ?? 0) * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );
  return <div {...rest}>{rows}</div>;
};
```
