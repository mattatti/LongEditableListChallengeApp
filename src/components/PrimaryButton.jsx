import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: '#232d85',
  color: 'white', // Default text color
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
  },
  '&.Mui-disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
    borderColor: '#999999',
  },
}));

const PrimaryButton = ({ children, disabled, handleClick }) => {
  return (
    <StyledButton variant="contained" disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

// TODO: Implement passed props
PrimaryButton.defaultProps = {
  children: null,
  disabled: false,
  handleClick: () => {},
};

export default PrimaryButton;
