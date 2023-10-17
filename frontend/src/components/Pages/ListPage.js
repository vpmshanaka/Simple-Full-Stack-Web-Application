import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../styles.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { format } from 'date-fns';

function ListPages() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [deletePageId, setDeletePageId] = useState(null);
  const pagesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, [currentPage]);

  const fetchPages = () => {
    api.get(`/pages?_page=${currentPage}&_limit=${pagesPerPage}`)
      .then(response => {
        setPages(response.data);
      })
      .catch(error => {
        console.error('Error fetching pages:', error);
      });
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleDelete = (pageId) => {
    setDeletePageId(pageId);
    setShowAlert(true);
    setAlertSeverity('warning');
    setAlertMessage('Are you sure you want to delete this page?');
  };

  const confirmDelete = () => {
    if (deletePageId) {
      api.delete(`/pages/${deletePageId}`)
        .then(() => {
          setPages(pages.filter(page => page.id !== deletePageId));
          setAlertMessage('Page deleted successfully');
          setAlertSeverity('success');
        })
        .catch(error => {
          console.error('Error deleting page:', error);
          setAlertMessage('Error deleting page');
          setAlertSeverity('error');
        })
        .finally(() => {
          setShowAlert(false);
          setDeletePageId(null);
        });
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const editPage = (pageId) => {
    navigate(`/page/edit/${pageId}`);
  };

  return (
    <div>
      <h2>Pages List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Slug</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map(page => (
            <tr key={page.id}>
              <td>{page.id}</td>
              <td>{page.title}</td>
              <td>{page.content}</td>
              <td>{page.slug}</td>
              <td>{format(new Date(page.createdDate), 'dd/MM/yyyy HH:mm')}</td>
              <td>
                <button onClick={() => editPage(page.id)}>Edit</button>
                <button onClick={() => handleDelete(page.id)} className="delete-button">Delete</button>
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

export default ListPages;
