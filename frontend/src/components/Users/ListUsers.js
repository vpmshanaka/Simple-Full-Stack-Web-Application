import React, { useEffect, useState, useCallback } from 'react'; // <-- Added useCallback
import api from '../../api';
import './Users.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { format } from 'date-fns';


function ListUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const usersPerPage = 10;
  const navigate = useNavigate();

  const fetchUsers = useCallback(() => { // <-- Using useCallback
    api.get(`/users?_page=${currentPage}&_limit=${usersPerPage}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
    setShowAlert(true);
    setAlertSeverity('warning');
    setAlertMessage('Are you sure you want to delete this user?');
  };

  const confirmDelete = () => {
    if (deleteUserId) {
      api.delete(`/users/${deleteUserId}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== deleteUserId));
          setAlertMessage('User deleted successfully');
          setAlertSeverity('success');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setAlertMessage('Error deleting user');
          setAlertSeverity('error');
        })
        .finally(() => {
          setShowAlert(false);
          setDeleteUserId(null);
        });
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const editUser = (userId) => {
    navigate(`/user/edit/${userId}`);
  };

  return (
    <div>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{format(new Date(user.createdDate), 'dd/MM/yyyy HH:mm')}</td>
              <td>
                <button onClick={() => editUser(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <span>{currentPage}</span>
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </div>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity={alertSeverity}
        >
          {alertMessage}
          {alertSeverity === 'warning' && (
            <Button color="secondary" size="small" onClick={confirmDelete}>
              Confirm
            </Button>
          )}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ListUsers;
