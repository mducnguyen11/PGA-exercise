import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import photoReducer, { PhotoState } from '../modules/photo/redux/photoReducer';
import transactionsReducer, { TransactionsState } from 'modules/manageTransactions/redux/transactions';
import loadingReducer, { AdminLoadingState } from 'modules/common/redux/loadingReducer';
import countryReducer, { CountryState } from 'modules/common/redux/countryReducer';
import categoriesReducer, { CategoriesState } from 'modules/common/redux/categoriesReducer';
import vendorsReducer, { VendorsState } from 'modules/common/redux/vendorReducer';
import shippingsReducer, { ShippingsState } from 'modules/common/redux/shippingReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  photos: PhotoState;
  transactions: TransactionsState;
  loading: AdminLoadingState;
  country: CountryState;
  categories: CategoriesState;
  vendors: VendorsState;
  shippings: ShippingsState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    photos: photoReducer,
    transactions: transactionsReducer,
    loading: loadingReducer,
    country: countryReducer,
    categories: categoriesReducer,
    vendors: vendorsReducer,
    shippings: shippingsReducer,
  });
}
