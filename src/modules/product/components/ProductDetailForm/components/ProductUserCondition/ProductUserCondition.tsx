import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import React, { memo } from 'react';

interface Props {
  value: string;
  changeData: Function;
}

const ProductUserCondition = (props: Props) => {
  return (
    <div className="product-detail-row product-detail-user-condition ">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Used condition</p>
      </div>
      <div className="product-detail-row-input product-detail-brand-input">
        <SelectForm
          className="product-detail-row-input-input-form select-form"
          key_name="brand"
          value={props.value}
          onChange={props.changeData}
          options={[
            {
              value: ' ',
              name: ' ',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default memo(ProductUserCondition);