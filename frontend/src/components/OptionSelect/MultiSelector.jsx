import PropTypes from "prop-types";
import "./OptionSelect.css";

export default function MultiSelector({
	label,
	placeholder,
	options,
	required,
	onChange,
	value = []
}) {
	const handleChange = (event) => {
		if (!event.target) return;

		const selectedOptions = Array.from(event.target.selectedOptions).map(
			(option) => ({ tagId: parseInt(option.value, 10) })
		);

		console.log(event.target.selectedOptions)
		onChange(selectedOptions);
	};

	return (
		<div className="select-wrapper">
			<label htmlFor="option-select">{label}</label>
			<select
				id="option-select"
				name="multi-option-select"
				multiple
				required={required}
				onChange={handleChange}
				value={value.map((val) => val.tagId.toString())}
			>
				{options.map((option) => (
					<>
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
						
					</>
				))}
			</select>
		</div>
	);
}

MultiSelector.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired,
	required: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.arrayOf(
		PropTypes.shape({
			tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		})
	)
};
