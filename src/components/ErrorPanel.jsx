import { Typography } from '@mui/material';
import React from 'react';
import styles from '../pages/users/users.module.css';

const ErrorPanel = ({ emptyCount, invalidCount }) => {
  if (emptyCount === 0 && invalidCount === 0) {
    return null; // Do not render if there are no errors
  }

  return (
    <div className={styles.errorCountContainer}>
      <Typography variant="body1">
        {`Errors: Empty Fields: ${emptyCount}, Invalid Fields: ${invalidCount}`}
      </Typography>
    </div>
  );
};

export default ErrorPanel;
