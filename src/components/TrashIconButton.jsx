import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = ({ handleClick }) => {
  return (
    <StyledIconButton onClick={handleClick} aria-label="delete" size="large">
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

// Default props for the component
TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
