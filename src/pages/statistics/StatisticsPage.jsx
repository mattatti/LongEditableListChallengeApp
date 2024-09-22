import { CircularProgress, Grid } from '@mui/material';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';

import { Pie } from 'react-chartjs-2';
import { useUsersContext } from '../../context/usersContext';
import styles from './statistics.module.css';

Chart.register(ArcElement, Tooltip, Legend); // Registered components

function StatisticsPage() {
  const { usersData } = useUsersContext();
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usersData.length > 0) {
      const countryCounts = {};

      // Counts users per country
      usersData.forEach((user) => {
        if (user.country) {
          countryCounts[user.country] = (countryCounts[user.country] || 0) + 1;
        }
      });

      // Data for the pie chart
      setChartData({
        labels: Object.keys(countryCounts),
        datasets: [
          {
            label: 'Users by Country',
            data: Object.values(countryCounts),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [usersData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          padding: 20,
        },
      },
    },
  };

  return (
    <div className={styles.pageRoot}>
      <h2>User Distribution by Country</h2>
      {!loading && chartData.labels && chartData.labels.length > 0 ? (
        <div className={styles.chartContainer}>
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: '70vh' }}
        >
          <CircularProgress />
        </Grid>
      )}
    </div>
  );
}

export default StatisticsPage;
