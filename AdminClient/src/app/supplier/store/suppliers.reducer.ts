import {SupplierModel} from '../../shared/model/supplier/supplier.model';
import {Action, ActionReducer, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as fromApp from '../../reducers/index';
import * as SupplierActions from './suppliers.actions';

export interface State {
	loading: boolean;
	suppliers: SupplierModel[];
	focusedSupplier: SupplierModel
}

const initialState: State = {
	loading: false,
	suppliers: null,
	focusedSupplier: null
};

export const selectSuppliersState = createFeatureSelector<fromApp.State, State>(
	'suppliers'
);

export const selectIsLoading = createSelector(
	selectSuppliersState,
	(state: State) => state.loading
);

export const selectAllSuppliers = createSelector(
	selectSuppliersState,
	(state: State) => state.suppliers
);

export const selectFocusedSupplier = createSelector(
	selectSuppliersState,
	(state: State) => state.focusedSupplier
);

// eslint-disable-next-line no-underscore-dangle
const _clientReducer: ActionReducer<State, Action> = createReducer(
	initialState,
	on(SupplierActions.beginLoadingSuppliers, (prevState: State) => ({
		...prevState,
		loading: true
	})),
	on(SupplierActions.allSuppliersLoaded, (prevState: State, {suppliers}) => ({
		...prevState,
		loading: false,
		suppliers
	})),
	on(
		SupplierActions.showEditSupplier,
		SupplierActions.showDeleteSupplier,
		(prevState: State, {focusedSupplier}) => ({
			...prevState,
			focusedSupplier
		})),
	on(
		SupplierActions.editSupplier,
		SupplierActions.deleteSupplier,
		(prevState: State) => ({
			...prevState,
			loading: true
		})),
	on(
		SupplierActions.editSupplierSuccess,
		SupplierActions.deleteSupplierSuccess,
		(prevState: State, {suppliers}) => ({
			...prevState,
			loading: false,
			suppliers
		})
	)
);

export const clientReducer = (state: State | undefined, action: Action) => _clientReducer(state, action);
