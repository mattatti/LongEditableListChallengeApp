import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const InputField = ({
  name,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  maxLength,
}) => {
  return (
    <StyledTextField
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      inputProps={{
        maxLength,
        autoComplete: 'off',
      }}
    />
  );
};

// Default props
InputField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChange: () => {},
  error: false,
  disabled: false,
  placeholder: 'Enter value...',
};

export default InputField;
