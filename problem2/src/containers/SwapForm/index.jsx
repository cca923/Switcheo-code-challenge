import React from "react";

import { MODAL_TYPE } from "../../constants";
import { useTokens } from "../../contexts/TokenProvide";
import useSwapForm from "../../hooks/useSwapForm";
import Card from "../../components/Card";
import TokenModal from "../TokenModal";

import "./styles.css";

const SwapForm = () => {
  const { tokenList } = useTokens();
  const {
    sendToken,
    receiveToken,
    sendAmount,
    receiveAmount,
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
          <Card
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

          <Card
            title="Receive"
            token={receiveToken}
            amount={receiveAmount}
            onSelectorClick={() => openModal({ type: MODAL_TYPE.TO_TOKEN })}
            onInputChange={onReceiveAmountChange}
          />
        </div>

        <button className="btn-swap shadow" type="button" onClick={onSwap}>
          Swap
        </button>
      </form>
      {/* TODO: cannot show existed token in diff modal */}
      {isModalOpen && <TokenModal tokenList={tokenList} onClose={closeModal} />}
    </>
  );
};

export default SwapForm;
