import InputForm from 'modules/admin/components/InputField/InputField';
import React, { memo } from 'react';

interface Props {
  value: string;
  onChange: Function;
  key_name: string;
  text: string;
  errorMessage?: string;
}

const InputKey = (props: Props) => {
  return (
    <div className={' product-detail-row ' + 'product-detail-' + props.key_name.replace('_', '-')}>
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">{props.text}</p>
      </div>
      <div className={'product-detail-row-input' + ' product-detail-' + props.key_name.replace('_', '-') + '-input'}>
        <InputForm
          className="product-detail-row-input-value"
          value={props.value}
          onChange={(a: object) => {
            props.onChange(a);
          }}
          key_name={props.key_name}
          error={props.errorMessage}
        />
      </div>
    </div>
  );
};

export default memo(InputKey);