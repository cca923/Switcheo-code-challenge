import { useMemo, useState } from "react";

import { useTokens } from "../contexts/TokenProvide";
import { MODAL_TYPE } from "../constants";

const useSwapForm = () => {
  const { tokenList, priceMap } = useTokens();

  const [sendToken, setSendToken] = useState("");
  const [receiveToken, setReceiveToken] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [rate, setRate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const validTokenList = useMemo(() => {
    return tokenList?.filter(
      (data) => data?.currency !== sendToken && data?.currency !== receiveToken
    );
  }, [sendToken, receiveToken, tokenList]);

  const exchangeRate = ({ fromToken, toToken }) => {
    const fromPrice = priceMap[fromToken];
    const toPrice = priceMap[toToken];
    return fromPrice && toPrice ? +toPrice / +fromPrice : 0;
  };

  const exchangeAmount = ({ amount, fromToken, toToken }) => {
    const fromPrice = priceMap[fromToken];
    const toPrice = priceMap[toToken];
    return fromPrice && toPrice ? +amount * (+toPrice / +fromPrice) : 0;
  };

  const handleSendAmountChange = ({ amount }) => {
    setSendAmount(amount);
    const receive = exchangeAmount({
      amount,
      fromToken: sendToken,
      toToken: receiveToken,
    });
    setReceiveAmount(receive);
  };

  const handleReceiveAmountChange = ({ amount }) => {
    setReceiveAmount(amount);
    const send = exchangeAmount({
      amount,
      fromToken: receiveToken,
      toToken: sendToken,
    });
    setSendAmount(send);
  };

  const handleSwap = () => {
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
    const receive = exchangeAmount({
      amount: sendAmount,
      fromToken: receiveToken,
      toToken: sendToken,
    });
    setReceiveAmount(receive);
    setRate(exchangeRate({ fromToken: receiveToken, toToken: sendToken }));
  };

  const openModal = ({ type }) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = ({ token }) => {
    if (!token) return setIsModalOpen(false);

    const tokenHandlers = {
      [MODAL_TYPE.FROM_TOKEN]: () => {
        setSendToken(token);
        const receive = exchangeAmount({
          amount: sendAmount,
          fromToken: token,
          toToken: receiveToken,
        });
        setReceiveAmount(receive);
        setRate(exchangeRate({ fromToken: token, toToken: receiveToken }));
      },
      [MODAL_TYPE.TO_TOKEN]: () => {
        setReceiveToken(token);
        const receive = exchangeAmount({
          amount: sendAmount,
          fromToken: sendToken,
          toToken: token,
        });
        setReceiveAmount(receive);
        setRate(exchangeRate({ fromToken: sendToken, toToken: token }));
      },
    };
    tokenHandlers?.[modalType]?.();
    setIsModalOpen(false);
  };

  return {
    validTokenList,
    sendToken,
    receiveToken,
    sendAmount,
    receiveAmount,
    rate,
    isModalOpen,
    openModal,
    closeModal,
    onSendAmountChange: handleSendAmountChange,
    onReceiveAmountChange: handleReceiveAmountChange,
    onSwap: handleSwap,
  };
};

export default useSwapForm;
