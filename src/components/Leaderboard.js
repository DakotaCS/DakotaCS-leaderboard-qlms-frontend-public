import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient.js';
import './Leaderboard.css';

const Leaderboard = ({ refreshTrigger, categoryId }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch category name from the 'category_board' table based on categoryId
        const { data: categoryData, error: categoryError } = await supabase
          .from('category_board')
          .select('name')
          .eq('id', categoryId)
          .single();

        if (categoryError) {
          throw new Error('Error fetching category data');
        }

        const fetchedCategoryName = categoryData?.name || 'Unknown Category';
        setCategoryName(fetchedCategoryName);

        const { data, error } = await supabase
          .from('leader_board')
          .select('id, user_id, board_category_id, car_name, max_speed, created_at')
          .eq('board_category_id', categoryId)
          .order('max_speed', { ascending: false })
          .limit(10);

        if (error) {
          throw new Error('Error fetching leaderboard');
        }

        // Prepare array of user IDs to fetch user names
        const userIds = data.map((entry) => entry.user_id);

        // Fetch user names from the 'user' table using the user IDs
        const { data: userData, error: userError } = await supabase
          .from('user')
          .select('id, name')
          .in('id', userIds);

        if (userError) {
          throw new Error('Error fetching user data');
        }

        // Map user IDs to user names
        const userIdToNameMap = {};
        userData.forEach((user) => {
          userIdToNameMap[user.id] = user.name;
        });

        // Update leaderboardData with user names and fetched category name
        const leaderboardDataWithNames = data.map((entry) => ({
          ...entry,
          user_name: userIdToNameMap[entry.user_id] || 'Unknown User',
        }));

        setLeaderboardData(leaderboardDataWithNames);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, [refreshTrigger, categoryId]); // Refresh data when refreshTrigger or categoryId changes

  return (
    <div className="leaderboard-container">
   
      <div className="leaderboard-header">
        <h1>Leaderboard Category: {categoryName}</h1>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Driver</th>
            <th>Car Model</th>
            <th>Top Speed</th>
            <th>Record Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.user_name}</td> {/* Display user's name */}
              <td>{entry.car_name}</td>
              <td>{entry.max_speed}</td>
              <td>{new Date(entry.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;