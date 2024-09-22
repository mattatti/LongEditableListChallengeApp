import { useCallback, useEffect, useMemo, useState } from 'react';

import { Typography } from '@mui/material';
import AddButton from '../../../components/AddButton';
import PaginationControls from '../../../components/PaginationControls';
import { useUsersContext } from '../../../context/usersContext';
import countryOptions from '../../../data/countries.json';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';

const USERS_PER_PAGE = 7; // Number of users to display per page

function UsersList({ onErrorCountChange }) {
  const { usersData } = useUsersContext();
  const [editedUsers, setEditedUsers] = useState(usersData);
  const [touchedFields, setTouchedFields] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Page state

  const handleRowChange = useCallback((userId, field, newValue) => {
    setEditedUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, [field]: newValue } : user))
    );

    setTouchedFields((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: true,
      },
    }));
  }, []);

  const errorCounts = useMemo(() => {
    return editedUsers.reduce(
      (acc, user) => {
        const isTouched = touchedFields[user.id] || {};
        const hasEmpty =
          (isTouched.name && user.name === '') ||
          (isTouched.country && user.country === '') ||
          (isTouched.email && user.email === '') ||
          (isTouched.phone && user.phone === '');

        const hasInvalid =
          (isTouched.name && user.name !== '' && !/^[a-zA-ZÀ-ÿ\s]+$/.test(user.name)) ||
          (isTouched.country &&
            user.country !== '' &&
            !countryOptions.includes(user.country)) ||
          (isTouched.email &&
            user.email !== '' &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) ||
          (isTouched.phone && user.phone !== '' && !/^\+\d{8,}$/.test(user.phone));

        if (hasEmpty) acc.emptyCount++;
        if (hasInvalid) acc.invalidCount++;

        return acc;
      },
      { emptyCount: 0, invalidCount: 0 }
    );
  }, [editedUsers, touchedFields]);

  useEffect(() => {
    setEditedUsers(usersData);
  }, [usersData]);

  useEffect(() => {
    const overallEmptyFieldCount = editedUsers.filter(
      (user) =>
        user.name === '' || user.country === '' || user.email === '' || user.phone === ''
    ).length;

    onErrorCountChange({ ...errorCounts, overallEmptyFieldCount });
  }, [editedUsers, errorCounts]);

  // Pagination: Calculate total pages
  const totalPages = Math.ceil(editedUsers.length / USERS_PER_PAGE);

  // Get users for the current page
  const usersOnCurrentPage = editedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({editedUsers.length})</Typography>

        <AddButton
          handleClick={() =>
            setEditedUsers([
              { id: Date.now(), name: '', country: '', email: '', phone: '' },
              ...editedUsers,
            ])
          }
        />
      </div>

      <div className={styles.usersListContent}>
        {usersOnCurrentPage.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onChange={handleRowChange}
            onDelete={(userId) =>
              setEditedUsers((prev) => prev.filter((u) => u.id !== userId))
            }
            touchedFields={touchedFields[user.id] || {}}
            setTouchedFields={setTouchedFields}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default UsersList;
