import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import countryOptions from '../../../data/countries.json';
import styles from '../users.module.css';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
  height: 40,
  '&  .MuiInputBase-root': {
    padding: 2,
  },
});

const UserRow = ({ user, onDelete, onChange, touchedFields }) => {
  const validateName = (name) => /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
  const validateCountry = (country) => countryOptions.includes(country);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+\d{8,}$/.test(phone);

  const isError = {
    name: touchedFields.name && (user.name === '' || !validateName(user.name)),
    country:
      touchedFields.country && (user.country === '' || !validateCountry(user.country)),
    email: touchedFields.email && (user.email === '' || !validateEmail(user.email)),
    phone: touchedFields.phone && (user.phone === '' || !validatePhone(user.phone)),
  };

  const handleFieldChange = (field, value) => {
    onChange(user.id, field, value);
  };

  return (
    <Grid container className={styles.userRow} spacing={2}>
      <Grid item xs={2}>
        <InputField
          name="name"
          value={user.name}
          error={isError.name}
          placeholder="Name"
          onChange={(name, value) => handleFieldChange(name, value)}
        />
      </Grid>
      <Grid item xs={3}>
        <StyledAutocomplete
          options={countryOptions}
          value={user.country || null}
          onChange={(event, newValue) => handleFieldChange('country', newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Country"
              error={isError.country}
            />
          )}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Grid>
      <Grid item xs={3}>
        <InputField
          name="email"
          value={user.email}
          error={isError.email}
          placeholder="Email"
          onChange={(name, value) => handleFieldChange(name, value)}
        />
      </Grid>
      <Grid item xs={2}>
        <InputField
          name="phone"
          value={user.phone}
          error={isError.phone}
          placeholder="Phone"
          onChange={(name, value) => handleFieldChange(name, value)}
        />
      </Grid>
      <Grid item xs={1}>
        <TrashIconButton handleClick={() => onDelete(user.id)} />
      </Grid>
    </Grid>
  );
};

export default UserRow;
