import { IUserDataField } from 'models/admin/user';
import CheckmarksGroup from 'modules/admin/components/CheckmarksGroup/CheckmarksGroup';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import { USER_ACCOUNT_STATUS_OPTIONS } from 'modules/admin/ultis';
import React from 'react';

interface Props {
  value: string[];
  onChange: (a: IUserDataField) => void;
}

const UserRoles = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Roles</p>
      <div className="user-detail-row-value">
        <CheckmarksGroup
          placeholder=""
          value={props.value}
          options={[{ name: '', options: USER_ACCOUNT_STATUS_OPTIONS }]}
          onChange={props.onChange}
          key_name="roles"
        />
      </div>
    </div>
  );
};

export default UserRoles;
