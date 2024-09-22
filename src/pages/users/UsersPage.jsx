import { useState } from 'react';
import ErrorPanel from '../../components/ErrorPanel';
import PrimaryButton from '../../components/PrimaryButton';
import { useUsersContext } from '../../context/usersContext';
import styles from './users.module.css';
import UsersList from './usersList/UsersList';

function UsersPage() {
  const { updateUserData, usersData } = useUsersContext();
  const [editedUsers, setEditedUsers] = useState(usersData);
  const [errorCounts, setErrorCounts] = useState({
    emptyCount: 0,
    invalidCount: 0,
    overallEmptyFieldCount: 0,
  });

  // Handle save button click to update the users in context
  const handleSave = () => {
    updateUserData(editedUsers);
  };

  // Determine if the save button should be disabled
  const isSaveDisabled =
    errorCounts.overallEmptyFieldCount > 0 || errorCounts.invalidCount > 0;

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList
          setEditedUsers={setEditedUsers}
          editedUsers={editedUsers}
          onErrorCountChange={setErrorCounts}
        />
        <ErrorPanel
          emptyCount={errorCounts.emptyCount}
          invalidCount={errorCounts.invalidCount}
        />

        <div className={styles.rightButtonContainer}>
          <PrimaryButton handleClick={handleSave} disabled={isSaveDisabled}>
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
