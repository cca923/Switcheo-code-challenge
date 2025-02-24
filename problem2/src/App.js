import "./App.css";
import SwapForm from "./containers/SwapForm";

import TokenProvider from "./contexts/TokenProvide";

function App() {
  return (
    <TokenProvider>
      <div className="container">
        <SwapForm />
      </div>
    </TokenProvider>
  );
}

export default App;
