// @flow
import React, {Component} from 'react';
import css from 'react-css-modules';
import Checkbox from '../shared/checkbox';
import {VisibleOffIcon} from '../icon';
import Tag from './tag';
import styles from './setting-filter-modal.css';

type Props = {
	onDelete: (tag: string) => void,
	onSubmit: (tag: string) => void,
	onSelectR18: (show: bool) => void,
	tags: Array<string>,
	r18: bool
};

type State = {
	value: string
};

@css(styles)
export default class SettingFilterModal extends Component {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {value: ''};
	}

	shouldComponentUpdate(nextProps: Props, nextState: State) {
		if (nextProps.tags.length !== this.props.tags.length) {
			return true;
		}
		if (this.state.value !== nextState.value) {
			return true;
		}
		if (this.props.r18 !== nextProps.r18) {
			return true;
		}
		return false;
	}

	handleCangeInput = (event: SyntheticEvent) => { // eslint-disable-line no-undef
		const target = event.target;
		if (target instanceof HTMLInputElement) {
			this.setState({value: target.value});
		}
	}

	handleSubmit = (event: SyntheticKeyboardEvent) => { // eslint-disable-line no-undef
		if (event.keyCode === 13 && this.state.value !== '') {
			event.preventDefault();
			this.props.onSubmit(this.state.value);
			this.setState({value: ''});
		}
	}

	handleSelectR18 = (event: any) => {
		this.props.onSelectR18(event.target.checked);
	}

	render() {
		const tags = this.props.tags.map(tag =>
			<Tag key={tag} tag={tag} onClick={this.props.onDelete}/>
		);

		return (
			<div styleName="wrap">
				<Checkbox
					id="toggleR18"
					onChange={this.handleSelectR18}
					value={this.props.r18}
					defaultChecked={this.props.r18}
					text={"R18を表示する"}
					/>
				<div styleName="tagFilter">
					<h4>タグフィルター</h4>
					<div styleName="field">
						<VisibleOffIcon/>
						<input
							type="text"
							styleName="input"
							value={this.state.value}
							onChange={this.handleCangeInput}
							onKeyDown={this.handleSubmit}
							/>
					</div>
					<ul>
						{tags}
					</ul>
				</div>
			</div>
		);
	}
}
