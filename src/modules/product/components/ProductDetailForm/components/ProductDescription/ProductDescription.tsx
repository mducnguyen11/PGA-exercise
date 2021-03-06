import JoditEditor from 'jodit-react';
import { IProductDetailDataField } from 'models/product';
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  value: string;
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
}

const ProductDescription = (props: Props) => {
  return (
    <>
      {' '}
      <div className="product-detail-row">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p">Description</p>
        </div>
        <div style={{ color: 'white' }} className="product-detail-row-input product-detail-description-input">
          <JoditEditor
            value={props.value}
            config={{
              readonly: false,
            }}
            onBlur={(e) => {
              props.onChange({
                description: e,
              });
            }}
          />
        </div>
      </div>
      {props.errorMessage ? (
        <div className="error-message-row">
          <span className="error-message">
            <FormattedMessage id={props.errorMessage} />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default memo(ProductDescription);
