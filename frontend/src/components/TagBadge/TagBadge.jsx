export const TagBadge = ({ name, color }) => {
	
	const style = `font-size: 11px;
		background-color: ${color.backgroundHex};
		color: ${color.nameHex};
		padding: 6px;
		border-radius: 8px;
		font-weight: 600;
	`

	return (
		<>
			<span style={style}>
				{name}
			</span>
		</>
	)
}