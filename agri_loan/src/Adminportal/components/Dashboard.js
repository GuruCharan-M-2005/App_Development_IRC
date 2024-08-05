import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css'; 
import AdminNavbar from './AdminNavbar';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [loanData, setLoanData] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [approvedLoans, setApprovedLoans] = useState(0);
  const [rejectedLoans, setRejectedLoans] = useState(0);
  const [yetToReview, setYetToReview] = useState(0);
  const [loading, setLoading] = useState(true);


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Applications',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/applications');
        const data = response.data;
        
   
        setTotalRequests(data.length);
        setApprovedLoans(data.filter(app => app.status === 'Approved').length);
        setRejectedLoans(data.filter(app => app.status === 'Rejected').length);
        setYetToReview(data.filter(app => app.status === 'Yet to Review').length);

        setLoanData(data);
        setLoading(false);


        const loanTypes = data.reduce((acc, { type }) => {
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {});

        const chartLabels = Object.keys(loanTypes);
        const chartValues = Object.values(loanTypes);

        setChartData({
          labels: chartLabels,
          datasets: [{
            label: 'Number of Applications',
            data: chartValues,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        });
      } catch (error) {
        console.error('Error fetching loan data:', error);
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  return (
    <div className='main-container-admin'>
      <AdminNavbar />
      <div className="dashboard-container">
        <div className='dashboard-wrap'>
          <div className="dashboard-left">
            <div>
              <h1>Welcome to the Loan Dashboard</h1>
              <p>Here is an overview of your loan statistics.</p>
            </div>
            <div className='report-creation'>
              <button className="primary-btn">Create Report</button>
            </div>
            <div className="illustration">
              <img src="/banner.png" alt="Dashboard Illustration" />
            </div>
          </div>
          <div className="dashboard-right">
            <div className="dashboard-card">
              <h2>Total Loan Requests</h2>
              <p className='dashboard-card-p'>{totalRequests}</p>
            </div>
            <div className="dashboard-card-approved">
              <h2>Approved Loans</h2>
              <p className='dashboard-card-rp'>{approvedLoans}</p>
            </div>
            <div className="dashboard-card-rejected">
              <h2>Rejected Applications</h2>
              <p className='dashboard-card-rp'>{rejectedLoans}</p>
            </div>
            <div className="dashboard-card">
              <h2>Yet to Review</h2>
              <p className='dashboard-card-p'>{yetToReview}</p>
            </div>
            </div>
            </div>
            <div className="dashboard-chart">
              <h2>Loan Types Overview</h2>
              {chartData.labels.length > 0 && (
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: 'Loan Type'
                        }
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Number of Applications'
                        },
                        beginAtZero: true
                      }
                    }
                  }}
                />
              )}
            </div>
          
      
      </div>
    </div>
  );
};

export default Dashboard;
