import React, { useEffect, useState } from 'react';
import './Users.css';
import Sidebar from './Sidebar';
import ConfirmationModal from './ConfirmationModal';
import AdminNavbar from './AdminNavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUserApplications, setSelectedUserApplications] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3008/users');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:4000/applications');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchUsers();
    fetchApplications();
  }, []);

  const handleDelete = async () => {
    try {
      if (userToDelete) {
        const response = await fetch(`http://localhost:3008/users/${userToDelete}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        setUsers(users.filter(users => users.id !== userToDelete));
        setUserToDelete(null);
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Pending':
        return 'status-pending';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const getApplicationCount = (userId) => {
    return applications.filter(app => app.userId === userId).length;
  };

  const fetchUserApplications = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/applications?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setSelectedUserApplications(data);
    } catch (error) {
      console.error('Error fetching user applications:', error);
    }
  };

  const openConfirmModal = async (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
    await fetchUserApplications(userId); 
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  const renderUserApplications = () => (
    <div className='user-applications-list'>
      <h4>Applications Submitted by User</h4>
      {selectedUserApplications.length > 0 ? (
        <ul>
          {selectedUserApplications.map(application => (
            <li key={application.id}>
              <p><strong>Application ID:</strong> {application.id}</p>
              <p><strong>Loan Amount:</strong> {application.loanAmount}</p>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Submitted At:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
            
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found for this user.</p>
      )}
    </div>
  );

  return (
    <div className='main-container-admin'>
      <AdminNavbar/>
      <Sidebar />
      <div className='user-container'>
        <h2>Users</h2>
        <div className='user-summary-card'>
          <h3>Total Users: {users.length}</h3>
        </div>
        <div className='user-cards-container'>
          {users.map(user => (
            <div className='user-card' key={user.id}>
              <div className='user-card-header'>
                {/* <img src={user.avatar || 'default-avatar.png'} alt='User Avatar' /> */}
                <h4>{user.username}</h4>
              </div>
              <p><strong>User Id:</strong> {user.id}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Phone Number:</strong> {user.phonenumber}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Date Joined:</strong> {new Date(user.dateOfJoining).toLocaleDateString()}</p>
              <p><strong>Time Joined:</strong> {user.timeOfJoining}</p>
              <p><strong>Applications Submitted:</strong> {getApplicationCount(user.id)}</p>
              <p className={`status ${getStatusClass(user.status)}`}>
                {user.status}
              </p>
              <div className='button-container'>
                <button className='button-edit'>Edit</button>
                <button className='button-delete-user' onClick={() => openConfirmModal(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onCancel={closeConfirmModal}
          content={renderUserApplications()} 
        />
      )}
    </div>
  );
};

export default Users;
