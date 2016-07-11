// @flow
export type LoadingType = {type: 'LOADING'};

export function currentWork(id: number) {
	return {
		type: 'SELECT_WORK',
		id
	};
}

export function receiveWorks(res: Array<Object>) {
	return {
		type: 'RECEIVE_WORKS',
		works: res
	};
}
