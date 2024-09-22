import { Button } from '@mui/material';
import React from 'react';
import styles from '../pages/users/users.module.css';

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.paginationControls}>
      <Button
        variant="outlined"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <Button
        variant="outlined"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
