import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbbar';
import Footer from '../Footer/Footer';
import './MyApplications.css';
import { TbReportSearch } from "react-icons/tb";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
   
    const fetchLoggedInUserId = async () => {
      try {
        const response = await fetch('http://localhost:3008/users');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const users = await response.json();
        const loggedInUser = users.find(users => users.islogin === 1);
        if (loggedInUser) {
          setLoggedInUserId(loggedInUser.id);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchLoggedInUserId();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:4000/applications');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        
     
        if (loggedInUserId) {
          const filteredApplications = data.filter(app => app.userId === loggedInUserId);
          setApplications(filteredApplications);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [loggedInUserId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/applications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'N/A';
    const visibleDigits = accountNumber.slice(-4);
    const maskedDigits = accountNumber.slice(0, -4).replace(/./g, 'X');
    return `${maskedDigits}${visibleDigits}`;
  };

  const getLoanTypeIcon = (loanType) => {
    switch (loanType) {
      case 'Crop Loan':
        return <img src='./W2B1.svg' className='my-application-icon' alt='Crop Loan Icon' />;
      case 'Digital Gold Loan':
        return <img src='./W2B2.svg' className='my-application-icon' alt='Digital Gold Loan Icon' />;
      case 'Agri Credit Card':
        return <img src='./W2B3.svg' className='my-application-icon' alt='Agri Credit Card' />;
      case 'Farm Mechanisation Loan':
        return <img src='./W2B5.svg' className='my-application-icon' alt='Farm Mechanisation Loan Icon' />;
      default:
        return null;
    }
  };

  const getStatusButton = (status) => {
    switch (status) {
      case 'Waiting Review':
        return <button className='status-button waiting-review'>Waiting for Review</button>;
      case 'Approved':
        return <button className='status-button-approved'>Approved</button>;
      case 'Rejected':
        return <button className='status-button-rejected'>Rejected</button>;
      default:
        return <button className='status-button-waiting-review'><TbReportSearch className='waiting-search' /> Waiting for Review</button>;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  };

  return (
    <div>
      <Navbar />
      <div className='my-applications'>
        <br /><br /><br /><br />
        <div><h2>My Applications</h2></div>
        <div className='my-application-container'>
          <div className='application-library'>
            {applications.length === 0 ? (
              <p className='no-applications'>No applications submitted yet.</p>
            ) : (
              applications.map((app) => (
                <div className='application-card' key={app.id}>
                  <div className='loan-icon'>{getLoanTypeIcon(app.loanType)}</div>
                  <h4>Application Id: {app.id}</h4>
                  <div className='para-bg'><p><strong>Name:</strong> {app.firstName} {app.lastName}</p></div>
                  <div className='para-bg'><p><strong>Loan Type:</strong> {app.loanType}</p></div>
                  <div className='para-bg'><p><strong>Loan Amount:</strong> {app.loanAmount}</p></div>
                  <div className='para-bg'><p><strong>Bank Name:</strong> {app.bankName}</p></div>
                  <div className='para-bg'><p><strong>Account Number:</strong> {maskAccountNumber(app.accountNumber)}</p></div>
                  <div><p><strong>Date Applied:</strong> {formatDate(app.submittedAt)}</p></div>
                  <div className='application-button-container'>
                    <button className='delete-button' onClick={() => handleDelete(app.id)}>Delete</button>
                    {getStatusButton(app.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyApplications;
