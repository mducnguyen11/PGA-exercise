import { IProductDetailDataField } from 'models/product';
import React, { memo, useState } from 'react';

interface Props {
  value: { membership_id: string }[];
  onChange: (value: IProductDetailDataField) => void;
}

const ProductMemberships = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="product-detail-row product-detail-memberships ">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Memberships</p>
      </div>
      <div className="product-detail-row-input product-detail-memberships-input ">
        <div className="select-form">
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="select-form-value product-detail-membership-value"
          >
            {props.value.length > 0 ? (
              props.value.map((a, i) => {
                return (
                  <p className="select-form-value-text product-detail-membership-value-item" key={i}>
                    {a.membership_id == '4' ? 'General' : ''}
                    <i className={open ? 'bx bx-chevron-down list-open' : 'bx bx-chevron-down'}></i>
                  </p>
                );
              })
            ) : (
              <p className="select-form-value-text product-detail-membership-value-item">
                <i className={open ? 'bx bx-chevron-down list-open' : 'bx bx-chevron-down'}></i>
              </p>
            )}
          </div>
          {open ? (
            <>
              {' '}
              <div className="select-form-list-options product-detail-membership-list">
                <div
                  onClick={() => {
                    if (props.value.findIndex((a) => a.membership_id == '4') == -1) {
                      props.onChange({
                        memberships: [{ membership_id: '4' }],
                      });
                    } else {
                      props.onChange({
                        memberships: [],
                      });
                    }
                  }}
                  className="select-form-option select-form-memberships-icon"
                >
                  {props.value != undefined ? (
                    props.value.findIndex((a) => a.membership_id == '4') == -1 ? (
                      <i className="select-form-option-check-icon bx bx-check-square"></i>
                    ) : (
                      <i className="select-form-option-check-icon bx bxs-check-square"></i>
                    )
                  ) : null}
                  <p className="select-form-option-value">General</p>
                </div>
              </div>
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="select-form-options-background"
              ></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductMemberships);
