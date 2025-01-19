import React from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const Graphs = ({ tasks }) => {
  const COLORS = ['#4CAF50', '#FF9800', '#F44336', '#2196F3'];

  const taskStatusData = [
    { name: 'Task Assigned', value: tasks.filter(task => task.status === 0).length },
    { name: 'Task Completed', value: tasks.filter(task => task.status === 1).length },
    { name: 'Task Rejected', value: tasks.filter(task => task.status === -1).length },
    { name: 'Task Overdue', value: tasks.filter(task => task.status === 0 && new Date(task.dueDate) < new Date()).length },
  ];

  const tasksByMonth = tasks.reduce((acc, task) => {
    const month = moment(task.createdAt).format('MMM YYYY');
    if (!acc[month]) {
      acc[month] = { assigned: 0, completed: 0, rejected: 0, overdue: 0 };
    }
    if (task.status === 0) {
      acc[month].assigned += 1;
      if (new Date(task.dueDate) < new Date()) {
        acc[month].overdue += 1;
      }
    } else if (task.status === 1) {
      acc[month].completed += 1;
    } else if (task.status === -1) {
      acc[month].rejected += 1;
    }
    return acc;
  }, {});

  const tasksByMonthData = Object.keys(tasksByMonth).map(month => ({
    month,
    assigned: tasksByMonth[month].assigned,
    completed: tasksByMonth[month].completed,
    rejected: tasksByMonth[month].rejected,
    overdue: tasksByMonth[month].overdue,
  }));

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-wrap justify-center space-x-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Task Status Distribution</h2>
          <ResponsiveContainer width={300} height={400}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Tasks Assigned Month-wise</h2>
          <ResponsiveContainer width={700} height={400}>
            <BarChart data={tasksByMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="assigned" stackId="a" fill="#4CAF50" />
              <Bar dataKey="completed" stackId="a" fill="#FF9800" />
              <Bar dataKey="rejected" stackId="a" fill="#F44336" />
              <Bar dataKey="overdue" stackId="a" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Tasks Assigned Over Time</h2>
        <ResponsiveContainer width={800} height={400}>
          <LineChart data={tasksByMonthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="assigned" stroke="#4CAF50" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graphs;