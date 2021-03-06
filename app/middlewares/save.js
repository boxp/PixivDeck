// @flow
import type {Store, Action, Dispatch} from '../types';

export default (store: Store) => (next: Dispatch) => (action: Action) => {
	if (action.id) {
		setImmediate(() => {
			localStorage.clear();
			localStorage.setItem('store', JSON.stringify(store.getState()));
		});
	}
	return next(action);
};
