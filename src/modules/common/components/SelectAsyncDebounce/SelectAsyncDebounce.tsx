import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  options: { value: string; name: string; [key: string]: any }[];
  loading?: boolean;
}

const SelectAsyncDebounce = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [valueName, setValueName] = useState<string>('');
  return (
    <>
      <div className="select-form">
        <div className="select-form-value">
          <input
            onChange={(e) => {
              setValueName(e.target.value);
              if (!open) {
                setOpen(true);
              }
              props.onChange(e.target.value);
            }}
            onFocus={() => {
              if (!open) {
                setOpen(true);
              }
            }}
            value={valueName}
            className="select-form-input admin-input-form"
            type="text"
          />
          {props.loading ? <CircularProgress size={20} /> : null}
          {open && !props.loading ? (
            <>
              <i
                onClick={() => {
                  setOpen(!open);
                }}
                className="bx bx-chevron-down list-open"
              ></i>
            </>
          ) : null}
        </div>
        {open ? (
          <div className="select-form-list-options">
            <>
              {open && props.options.length > 0 ? (
                <>
                  {props.options.map((option, i) => {
                    return (
                      <div
                        onClick={() => {
                          setOpen(false);
                          setValueName(option.name);
                          if (props.value !== option.value) {
                            props.onChange(option.value);
                          }
                        }}
                        key={i}
                        className="select-form-option"
                      >
                        <p className="select-form-option-value">{option.name}</p>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="select-form-option">
                  <p className="select-form-option-value">No vendor match</p>
                </div>
              )}
            </>
          </div>
        ) : null}
      </div>
      {props.errorMessage && valueName == '' ? (
        <div className="select-form-error-message">
          <span className="error-message">
            <FormattedMessage id={props.errorMessage} />{' '}
          </span>
        </div>
      ) : null}
      {open ? (
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="select-form-options-background"
        ></div>
      ) : null}
    </>
  );
};

export default SelectAsyncDebounce;
