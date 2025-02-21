import React from "react";
import NumberInput from "../../components/NumberInput";
import Currency from "../../components/Currency";

import { MODAL_TYPE } from "../../constants";
import { useTokens } from "../../contexts/TokenProvide";
import useSwapForm from "../../hooks/useSwapForm";
import TokenModal from "../TokenModal";

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
      <form>
        <div onClick={() => openModal({ type: MODAL_TYPE.FROM_TOKEN })}>
          <Currency name={sendToken} />
        </div>
        <NumberInput
          title="Pay"
          value={sendAmount}
          onChange={onSendAmountChange}
          placeholder="0"
        />

        <div onClick={() => openModal({ type: MODAL_TYPE.TO_TOKEN })}>
          <Currency name={receiveToken} />
        </div>

        <NumberInput
          title="Receive"
          value={receiveAmount}
          onChange={onReceiveAmountChange}
          placeholder="0"
        />
        <button type="button" onClick={onSwap}>
          Swap
        </button>
      </form>

      {isModalOpen && <TokenModal tokenList={tokenList} onClose={closeModal} />}
    </>
  );
};

export default SwapForm;
