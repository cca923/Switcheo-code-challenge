import { useState } from "react";

import { useTokens } from "../contexts/TokenProvide";
import { MODAL_TYPE } from "../constants";
import { isNumber } from "../utils";

const useSwapForm = () => {
  const { priceMap } = useTokens();

  const [sendToken, setSendToken] = useState("");
  const [receiveToken, setReceiveToken] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenType, setTokenType] = useState("");

  const calculateAmount = ({ amount, fromToken, toToken }) => {
    if (!isNumber(amount) || parseFloat(amount) < 0) {
      // TODO: error alert
      return 0;
    }

    const fromPrice = priceMap[fromToken];
    const toPrice = priceMap[toToken];
    return fromPrice && toPrice ? amount * (toPrice / fromPrice) : 0;
  };

  const handleSendAmountChange = (e) => {
    const value = parseFloat(e?.target?.value) || "";
    setSendAmount(value);
    setReceiveAmount(
      calculateAmount({
        amount: value,
        fromToken: sendToken,
        toToken: receiveToken,
      })
    );
  };

  const handleReceiveAmountChange = (e) => {
    const value = parseFloat(e?.target?.value) || "";
    setReceiveAmount(value);
    setSendAmount(
      calculateAmount({
        amount: value,
        fromToken: receiveToken,
        toToken: sendToken,
      })
    );
  };

  const handleSwap = () => {
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
    setReceiveAmount(
      calculateAmount({
        amount: sendAmount,
        fromToken: receiveToken,
        toToken: sendToken,
      })
    );
  };

  const openModal = ({ type }) => {
    setTokenType(type);
    setIsModalOpen(true);
  };

  const closeModal = ({ token }) => {
    if (!token) {
      return setIsModalOpen(false);
    }

    switch (tokenType) {
      case MODAL_TYPE.FROM_TOKEN:
        setSendToken(token);
        setReceiveAmount(
          calculateAmount({
            amount: sendAmount,
            fromToken: token,
            toToken: receiveToken,
          })
        );
        break;
      case MODAL_TYPE.TO_TOKEN:
        setReceiveToken(token);
        setReceiveAmount(
          calculateAmount({
            amount: sendAmount,
            fromToken: sendToken,
            toToken: token,
          })
        );
        break;
      default:
        break;
    }
    setIsModalOpen(false);
  };

  return {
    sendToken,
    receiveToken,
    sendAmount,
    receiveAmount,
    isModalOpen,
    openModal,
    closeModal,
    onSendAmountChange: handleSendAmountChange,
    onReceiveAmountChange: handleReceiveAmountChange,
    onSwap: handleSwap,
  };
};

export default useSwapForm;
