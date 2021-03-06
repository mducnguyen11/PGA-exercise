import { IProductDetailDataField } from 'models/product';
import Switch from 'modules/common/components/Switch/Switch';
import React, { memo } from 'react';
import './ProductInputSwitch.scss';

interface Props {
  key_name: string;
  onChange: (value: IProductDetailDataField) => void;
  value: string;
  text: string;
  helperIcon?: boolean;
}

const ProductInputSwitch = (props: Props) => {
  const handleChange = (a: { [key: string]: string }) => {
    props.onChange(a);
  };
  return (
    <div className="product-detail-row">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">{props.text}</p>
      </div>
      <div
        className={
          'product-detail-row-input product-detail-row-switch-input  ' +
          ' product-detail-' +
          props.key_name.replace('_', '-') +
          '-input'
        }
      >
        {' '}
        <Switch onChange={handleChange} value={Number(props.value)} name={props.key_name} />
        {props.helperIcon ? <i className="bx bx-help-circle"></i> : null}
      </div>
    </div>
  );
};

export default memo(ProductInputSwitch);
