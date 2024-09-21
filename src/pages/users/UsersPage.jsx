import { useState } from 'react';
import { useUsersContext } from '../../context/usersContext';
import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  const { updateUserData } = useUsersContext();
  const [editedUsers, setEditedUsers] = useState([]);
  const [errorCounts, setErrorCounts] = useState({
    emptyCount: 0,
    invalidCount: 0,
    overallEmptyFieldCount: 0,
  });

  // Handle save button click to update the users in context
  const handleSave = () => {
    updateUserData(editedUsers); // Updates users in the context
  };

  // Determine if the save button should be disabled
  const isSaveDisabled =
    errorCounts.overallEmptyFieldCount > 0 || errorCounts.invalidCount > 0;

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList onSave={setEditedUsers} onErrorCountChange={setErrorCounts} />
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
