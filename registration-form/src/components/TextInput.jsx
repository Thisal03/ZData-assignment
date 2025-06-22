const TextInput = ({ label, value, onChange, error, ...props }) => (
  <div className="input-group">
    <label>{label}</label>
    <input value={value} onChange={onChange} {...props} className={error ? 'invalid' : ''} />
    {error && <span className="error">{error}</span>}
  </div>
);
export default TextInput; 