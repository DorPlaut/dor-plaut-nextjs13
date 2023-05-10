import { useKeyboardControls } from '@react-three/drei';
import React from 'react';
import {
  BsArrowDownShort,
  BsArrowLeftShort,
  BsArrowRepeat,
  BsArrowRightShort,
  BsArrowUpShort,
} from 'react-icons/bs';

const Btn = ({ fireKey, k, symbol }) => {
  return (
    <button
      onMouseDown={() => fireKey(k, true)}
      onTouchStart={(e) => {
        e.preventDefault();
        fireKey(k, true);
      }}
      onMouseUp={() => fireKey(k, false)}
      onTouchEnd={(e) => {
        e.preventDefault();
        fireKey(k, false);
      }}
      className="btn block-btn dark game-btn"
    >
      {symbol}
    </button>
  );
};

const Controlls = ({ fireKey }) => {
  return (
    <>
      <div className="box-controlls">
        <Btn fireKey={fireKey} k={'r'} symbol={<BsArrowRepeat />} />

        <div />
        <div />
        <div />
        <Btn fireKey={fireKey} k={'w'} symbol={<BsArrowUpShort />} />
        <div />
        <Btn fireKey={fireKey} k={'a'} symbol={<BsArrowLeftShort />} />
        <Btn fireKey={fireKey} k={'s'} symbol={<BsArrowDownShort />} />
        <Btn fireKey={fireKey} k={'d'} symbol={<BsArrowRightShort />} />
      </div>
    </>
  );
};

export default Controlls;
