import './ManageUsersPage.scss';
import { API_PATHS } from 'configs/api';
import { defaultFilterUserValue, IFilterUser, IUserDataTableItem } from 'models/admin/user';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import TablePagination from '@mui/material/TablePagination';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';

import Button from 'modules/common/components/Button/Button';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import UsersFilter from 'modules/user/components/UsersFilter/UsersFilter';
import UsersTable from 'modules/user/components/UsersTable/UsersTable';

interface Props {}

const ManageUsers = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listUsers, setListUsers] = useState<{ select_checked: boolean; user: IUserDataTableItem }[]>([]);
  const [filter, setFilter] = useState<IFilterUser>(defaultFilterUserValue);
  const [alertSuccess, setAlertSuccess] = React.useState('');
  const [alertError, setAlertError] = React.useState<string>('');
  const [totalItem, setTotalItem] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess('');
  };
  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError('');
  };
  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilter({
      ...filter,
      page: newPage + 1,
    });
  }, []);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter({
      ...filter,
      count: parseInt(event.target.value, 10),
    });
  };
  const getUsers = React.useCallback(async () => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.getUserList, 'post', { ...filter }));
    if (res.data.length > 0 && res.success) {
      const listUsers = res.data.map((item: IUserDataTableItem, i: number) => {
        return {
          select_checked: false,
          user: { ...item },
        };
      });
      setListUsers(listUsers);
      setTotalItem(Number(res.recordsFiltered));
    } else {
      setAlertError('Have no product');
      setListUsers([]);
      setTotalItem(0);
    }
    dispatch(stopLoading());
  }, [setListUsers, filter]);
  useEffect(() => {
    getUsers();
  }, [filter]);
  const handleChangeUserDataRow = (newUser: { select_checked: boolean; user: IUserDataTableItem }) => {
    const index = listUsers.findIndex((item) => item.user.profile_id == newUser.user.profile_id);
    const newListUser = [...listUsers];
    newListUser[index] = {
      ...newUser,
    };
    setListUsers(newListUser);
  };
  const handleRemoveSelected = async () => {
    setOpenDeleteModal(false);
    dispatch(setLoading());
    const selectedList = listUsers.filter((a) => a.select_checked == true);
    const params = [
      ...selectedList.map((item) => {
        return {
          id: item.user.profile_id,
          delete: 1,
        };
      }),
    ];

    const res = await dispatch(fetchThunk(API_PATHS.deleteUserByIDArray, 'post', { params: params }));
    if (res.success) {
      getUsers();
      setAlertSuccess('Removre successully');
    } else {
      setAlertError('Remove fail');
    }
    dispatch(stopLoading());
  };
  const handleSelectAll = (value: boolean) => {
    const newListUsers = listUsers.map((a) => {
      return {
        ...a,
        select_checked: value,
      };
    });
    setListUsers([...newListUsers]);
  };
  const handleChangeFilter = useCallback(
    (filterField: { [key: string]: any }) => {
      setFilter({
        ...filter,
        ...filterField,
      });
    },
    [setFilter],
  );
  return (
    <div className="manage-users">
      <h2 className="title">Search for User</h2>
      <div className="manage-users-filter">
        <UsersFilter onChange={handleChangeFilter} filter={filter} />
      </div>
      <Link to="/pages/user/new-user">
        <Button className="btn-add-product">Add User</Button>
      </Link>
      <UsersTable
        handleSelectAll={handleSelectAll}
        handleChangeSort={handleChangeFilter}
        sort={filter.sort}
        order_by={filter.order_by}
        handleChangeData={handleChangeUserDataRow}
        data={listUsers}
      />
      <div className="table-pagination">
        <TablePagination
          component="div"
          count={totalItem}
          page={filter.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={filter.count}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className="bottom-btns">
        <Button
          onClick={() => {
            setOpenDeleteModal(true);
          }}
          color="yellow"
          className="btn-export"
        >
          Remove Selected
        </Button>
        <Dialog
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Confirm Update?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Do you want to remove these users ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              No
            </Button>
            <Button onClick={handleRemoveSelected}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={alertSuccess !== ''} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
          {alertSuccess}
        </Alert>
      </Snackbar>
      <Snackbar open={alertError !== ''} autoHideDuration={3000} onClose={handleCloseAlertError}>
        <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
          {alertError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageUsers;