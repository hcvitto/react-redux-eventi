var React = require('react');
var ReactDOM = require('react-dom');

export const FormRow = ({ children }) => {
  return (
    <div>{ children }</div>
  );
}

export const Label = ({ testo, children }) => {
  return (
    <label><span>{ testo }</span>{ children }</label>
  );
}

export const InputHidden = ({ value }) => {
  return (
    <input type="hidden" value={ value } />
  );
}

export const InputText = ({ name, value, onChange }) => {
  return (
    <input type="text" name={ name } value={ value } className="form-control" onChange={ e => { onChange(e, name) }} />
  );
}

export const InputSelect = ({ name, value, opts, onChange }) => {
  const val = value || '';
  const options = opts.map(function(opt, i) {
    if (typeof opt === "object") {
      return (
        <option value={opt.value} key={i}>{opt.label}</option>
      );
    } else {
      return (
        <option value={opt} key={i}>{opt}</option>
      );
    }
  });
  return (
    <select name={ name } value={ val } className="form-control" onChange={ e => { onChange(e, name) }}>
      {options}
    </select>
  );
}

export const InputSubmit = ({ value }) => {
  return (
    <input type="submit" value={ value } className="btn" />
  );
}