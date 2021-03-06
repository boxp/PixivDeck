// @flow
import React, {Component} from 'react';
import css from 'react-css-modules';
import {RANKING_MODES} from '../../contains';
import type {Query} from '../../types/column';
import {rankMap} from '../../utils';
import styles from './select-column-modal.css';

class Link extends Component {
	props: {
		onSelect: (mode: string) => void,
		mode: string
	};

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<li>
				<a onClick={() => this.props.onSelect(this.props.mode)}>
					{rankMap(this.props.mode)}
				</a>
			</li>
		);
	}
}

type Props = {
	onSelect: (query: Query, title: string) => void,
	onClickHistory: () => void,
};

@css(styles)
export default class SelectColumnModal extends Component {
	props: Props;

	handleAddRanking = (mode: string) => {
		this.props.onSelect({type: 'ranking', opts: {mode, page: 1}}, `${rankMap(mode)}ランキング`);
	}

	handleAddFavorite = (publicity: 'private' | 'public') => {
		this.props.onSelect({type: 'favoriteWorks', opts: {publicity, page: 1}}, `favorite/${publicity}`);
	}

	handleAddHistory = () => {
		this.props.onSelect({type: 'history', opts: {page: 1}}, 'history');
	}

	render() {
		const rankingLinks = RANKING_MODES.map(v =>
			<Link
				mode={v}
				key={v}
				onSelect={this.handleAddRanking}
				/>
		);

		return (
			<div styleName="wrap">
				<header>
					<h4>追加するカラムを選択</h4>
				</header>
				<div>
					<div styleName="kind">ランキング</div>
					<ul styleName="list">
						{rankingLinks}
					</ul>
					<div styleName="kind">ブックマーク</div>
					<ul styleName="list">
						<li>
							<a onClick={() => this.handleAddFavorite('public')}>
								公開ブックマーク
							</a>
						</li>
						<li>
							<a onClick={() => this.handleAddFavorite('private')}>
								非公開ブックマーク
							</a>
						</li>
					</ul>
					<div styleName="kind">履歴</div>
					<ul styleName="list">
						<li>
							<a onClick={this.props.onClickHistory}>
								ヒストリー
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
