import { useState } from "react";
import InputBox from "./componets/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
     <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4636069/pexels-photo-4636069.jpeg')",
      }}
    >
      <div className="w-full max-w-md bg-white/30 p-6 rounded-lg shadow-md backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(amount) => setAmount(amount)}
            selectedCurrency={from}
          />

          <div className="my-4 text-center">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectedCurrency={to}
            amountDisabled
          />

          <button
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg
            hover:bg-green-700
            active:scale-95
            transition-all duration-200
            shadow-md hover:shadow-lg"
            >
            Convert
            </button>
        </form>
      </div>
    </div>
  );
}

export default App;