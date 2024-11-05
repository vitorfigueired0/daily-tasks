export const TagBadge = ({ name, nameHex, backgroundHex }) => {
	
	const style = {
		fontSize: '11px',
		backgroundColor: backgroundHex,
		color: nameHex,
		padding: '6px',
		borderRadius: '8px',
		fontWeight: 600
	}

	return (
		<>
			<span style={style}>
				{name}
			</span>
		</>
	)
}