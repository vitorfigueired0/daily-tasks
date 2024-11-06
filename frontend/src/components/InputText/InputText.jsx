import PropTypes from "prop-types";
import "./InputText.css";
export default function InputText({
  label,
  placeholder,
  textarea,
  required,
  value,
  error,
  onChange = () => { },
}) {

  const style = {
    minWidth: '15rem',
    border: 'none',
    borderRadius: '.5rem',
    outline: error ? '10px solid red' : '1px solid #E9EBEF',
    background: 'rgba(238, 242, 245, 0.50)',
    padding: '.75rem 1.25rem'
  }

  
  return (
    <div className='input-wrapper'>
    <p>{error}</p>
      {textarea ? (
        <>
          <label htmlFor="input-textarea">{label}</label>
          <textarea
            id="input-textarea"
            name="input-textarea"
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            value={value}
            style={style}
          />
        </>
      ) : (
        <>
          <label htmlFor="input-text">{label}</label>
          <input
            onChange={onChange}
            type="text"
            id="input-text"
            name="input-text"
            placeholder={placeholder}
            required={required}
            value={value}
            style={style}
          />
        </>
      )}
    </div>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};
