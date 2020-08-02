import Utils from 'elementor-app/utils/utils.js';

import './list.scss';

export default function List( props ) {
	const baseClassName = 'eps-list',
		classes = [
			baseClassName,
			props.className,
		],
		style = {
			'--eps-list-spacing': Utils.pxToRem( props.spacing ) || 0,
		};

	return (
		<ul style={ style } className={ Utils.arrayToClassName( classes ) }>
			{ props.children }
		</ul>
	);
}

List.propTypes = {
	className: PropTypes.string,
	divided: PropTypes.any,
	separated: PropTypes.any,
	spacing: PropTypes.number,
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ).isRequired,
};

List.defaultProps = {
	className: '',
};

List.Item = function ListItem( props ) {
	const style = {
		'--eps-list-item-spacing': Utils.pxToRem( props.spacing ) || 0,
	};

	return (
		<li style={ style } className={ `eps-list__item ${ props.className }` }>
			{ props.children }
		</li>
	);
};

List.Item.propTypes = {
	className: PropTypes.string,
	spacing: PropTypes.number,
	children: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ).isRequired,
};

List.Item.defaultProps = {
	className: '',
};
