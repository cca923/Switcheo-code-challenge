import React from "react";

import { MODAL_TYPE } from "../../constants";
import useSwapForm from "../../hooks/useSwapForm";
import TokenCard from "./TokenCard";
import TokenModal from "../TokenModal";

import "./styles.css";

const SwapForm = () => {
  const {
    validTokenList,
    sendToken,
    receiveToken,
    sendAmount,
    receiveAmount,
    rate,
    isModalOpen,
    openModal,
    closeModal,
    onSendAmountChange,
    onReceiveAmountChange,
    onSwap,
  } = useSwapForm();

  return (
    <>
      <form className="form">
        <div className="card-wrapper">
          <TokenCard
            title="Pay"
            token={sendToken}
            amount={sendAmount}
            onSelectorClick={() => openModal({ type: MODAL_TYPE.FROM_TOKEN })}
            onInputChange={onSendAmountChange}
          />

          <img
            className="img-convert"
            src="/images/convert.png"
            alt="convert"
          />

          <TokenCard
            title="Receive"
            token={receiveToken}
            amount={receiveAmount}
            onSelectorClick={() => openModal({ type: MODAL_TYPE.TO_TOKEN })}
            onInputChange={onReceiveAmountChange}
            inputDisabled={!receiveToken}
          />
        </div>

        <div className="rate">
          {rate ? `1 ${sendToken} = ${rate} ${receiveToken}` : "Exchange Rate"}
        </div>

        <button className="btn-swap shadow" type="button" onClick={onSwap}>
          Swap
        </button>
      </form>

      {isModalOpen && (
        <TokenModal tokenList={validTokenList} onClose={closeModal} />
      )}
    </>
  );
};

export default SwapForm;
