import PropTypes from "prop-types";
import "./OptionSelect.css";
export default function OptionSelect({
  label,
  placeholder,
  options,
  required,
  onChange,
  value
}) {
  return (
    <div className="select-wrapper">
      <label htmlFor="option-select">{label}</label>
      <select
        id="option-select"
        name="option-select"
        required={required}
        onChange={onChange}
        value={value}
      >
        <option value={""} disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

OptionSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  required: PropTypes.bool,
  onChange: PropTypes.func,
};
