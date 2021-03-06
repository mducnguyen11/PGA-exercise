import React from 'react';
import './InputTableRow.scss';
interface Props {
  unit?: string;
  value: string;
  onChange: Function;
  name: string;
  className?: string;
  onCloseInput: Function;
  focus: string;
}

const InputTableRow = (props: Props) => {
  return (
    <div className={'input-table-row ' + props.className || ''}>
      {props.unit ? <p>{props.unit}</p> : null}
      <input
        type="number"
        onChange={(e) => {
          const a: {
            [key: string]: string;
          } = {};
          a[`${props.name}`] = e.target.value;
          props.onChange(a);
        }}
        value={props.value}
        onBlur={() => {
          props.onCloseInput();
        }}
        autoFocus={props.focus == props.name}
      />
    </div>
  );
};

export default InputTableRow;
