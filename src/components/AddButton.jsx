import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledAddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 10px',
  backgroundColor: '#3270ae',
  '&:hover': {
    backgroundColor: '#2989e8',
  },
});

const AddButton = ({ disabled, handleClick }) => {
  return (
    <StyledAddButton variant="contained" disabled={disabled} onClick={handleClick}>
      <AddIcon fontSize="inherit" />
    </StyledAddButton>
  );
};

// TODO: Implement passed props
AddButton.defaultProps = {
  disabled: false,
  handleClick: () => {},
};

export default AddButton;
