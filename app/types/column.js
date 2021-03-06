// @flow
export type Query = {
	type: 'search' | 'ranking' | 'favoriteWorks' | 'userWorks' | 'history',
	id?: number,
	q?: string,
	opts: {
		mode?: string,
		publicity?: 'public' | 'private',
		page: number
	}
};

export type ColumnType = {
	id: number,
	title: string,
	works: Array<number>,
	query: Query
};

export type ColumnAction =
	| {type: 'RECEIVE_WORKS', id: number, works?: Array<number>}
	| {type: 'ADD_COLUMN', id: number, title: string, query: Query }
	| {type: 'RELOAD_COLUMN', id: number}
	| {type: 'NEXT_PAGE', id: number }
	| {type: 'CLOSE_COLUMN', id: number }
;
