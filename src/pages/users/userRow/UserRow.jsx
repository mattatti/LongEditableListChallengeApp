import { Grid, TextField } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import countryOptions from '../../../data/countries.json';
import styles from '../users.module.css';

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
  const [nameInput, setNameInput] = useState(user.name);
  const [countryInput, setCountryInput] = useState(user.country);
  const [emailInput, setEmailInput] = useState(user.email);
  const [phoneInput, setPhoneInput] = useState(user.phone);

  const validateName = (name) => /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
  const validateCountry = (country) => countryOptions.includes(country);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+\d{8,}$/.test(phone);

  const isError = {
    name: touchedFields.name && (nameInput === '' || !validateName(nameInput)),
    country:
      touchedFields.country && (countryInput === '' || !validateCountry(countryInput)),
    email: touchedFields.email && (emailInput === '' || !validateEmail(emailInput)),
    phone: touchedFields.phone && (phoneInput === '' || !validatePhone(phoneInput)),
  };

  // Debounced change handler
  const debouncedHandleFieldChange = useCallback(
    debounce((field, value) => {
      onChange(user.id, field, value);
    }, 300),
    []
  );

  const handleFieldChange = (field, value) => {
    // Update local state immediately so the input reflects the value
    switch (field) {
      case 'name':
        setNameInput(value);
        break;
      case 'country':
        setCountryInput(value);
        break;
      case 'email':
        setEmailInput(value);
        break;
      case 'phone':
        setPhoneInput(value);
        break;
      default:
        break;
    }

    debouncedHandleFieldChange(field, value);
  };

  const autocompleteField = useMemo(
    () => (
      <StyledAutocomplete
        options={countryOptions}
        value={countryInput || null}
        onChange={(event, newValue) => handleFieldChange('country', newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Country"
            error={isError.country}
            inputProps={{
              ...params.inputProps,
              maxLength: 60,
            }}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: '#909196',
                borderRadius: '4px',
              },
            }}
          />
        )}
        isOptionEqualToValue={(option, value) => option === value}
      />
    ),
    [countryInput, isError.country]
  );

  return (
    <Grid container className={styles.userRow} spacing={2}>
      <Grid item xs={2}>
        <InputField
          name="name"
          value={nameInput}
          error={isError.name}
          placeholder="Name"
          maxLength={70}
          onChange={(name, value) => handleFieldChange(name, value)}
        />
      </Grid>

      <Grid item xs={3}>
        {autocompleteField}
      </Grid>

      <Grid item xs={3}>
        <InputField
          name="email"
          value={emailInput}
          error={isError.email}
          placeholder="Email"
          maxLength={254}
          onChange={(name, value) => handleFieldChange(name, value)}
        />
      </Grid>

      <Grid item xs={2}>
        <InputField
          name="phone"
          value={phoneInput}
          error={isError.phone}
          placeholder="Phone"
          maxLength={15}
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
