import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useUsersContext } from '../../context/usersContext';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './statistics.module.css';

Chart.register(ArcElement, Tooltip, Legend); // Registered components

function StatisticsPage() {
  const { usersData } = useUsersContext();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const countryCounts = {};

    // Counts users per country
    usersData.forEach((user) => {
      if (user.country) {
        countryCounts[user.country] = (countryCounts[user.country] || 0) + 1;
      }
    });

    //Data for the pie chart
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
  }, [usersData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows for custom width and height
    plugins: {
      legend: {
        position: 'left', // Adjust the position of the legend as needed
        labels: {
          padding: 20,
        },
      },
    },
  };

  return (
    <div className={styles.pageRoot}>
      <h2>User Distribution by Country</h2>
      {chartData.labels ? (
        <div className={styles.chartContainer}>
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default StatisticsPage;
