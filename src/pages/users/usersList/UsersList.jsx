import { useState, useEffect } from 'react';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';
import { Typography } from '@mui/material';
import AddButton from '../../../components/AddButton';
import countryOptions from '../../../data/countries.json';

function UsersList({ onSave, onErrorCountChange }) {
  const { usersData } = useUsersContext();
  const [editedUsers, setEditedUsers] = useState(usersData);
  const [touchedFields, setTouchedFields] = useState({});

  const handleRowChange = (userId, field, newValue) => {
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
  };

  // Calculate error counts
  const errorCounts = editedUsers.reduce(
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

  // Determine if any fields across all rows are empty
  const overallEmptyFieldCount = editedUsers.filter(
    (user) =>
      user.name === '' || user.country === '' || user.email === '' || user.phone === ''
  ).length;

  // Sync initial data from context to local state
  useEffect(() => {
    setEditedUsers(usersData);
  }, [usersData]);

  // Call the error count update on changes
  useEffect(() => {
    onErrorCountChange({ ...errorCounts, overallEmptyFieldCount }); // Communicate the error counts
  }, [editedUsers, touchedFields, errorCounts]);

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
        {editedUsers.map((user) => (
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
      <div className={styles.errorCountContainer}>
        <Typography variant="body1">
          {`Errors: Empty Fields: ${errorCounts.emptyCount}, Invalid Fields: ${errorCounts.invalidCount}`}
        </Typography>
      </div>
    </div>
  );
}

export default UsersList;
