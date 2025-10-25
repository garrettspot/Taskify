import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      setTasks([response.data, ...tasks]);
      setMessage('Task added successfully!');
      setShowForm(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding task:', error);
      setMessage('Error adding task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, taskData);
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      setMessage('Task updated successfully!');
      setShowForm(false);
      setEditingTask(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/api/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
        setMessage('Task deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting task:', error);
        setMessage('Error deleting task');
      }
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}/toggle`);
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (error) {
      console.error('Error toggling task:', error);
      setMessage('Error updating task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Manage your tasks and stay organized.</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#495057' }}>Your Tasks</h2>
            <p style={{ margin: '5px 0 0 0', color: '#6c757d' }}>
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
              style={{ marginRight: '10px' }}
            >
              + Add Task
            </button>
            <button
              onClick={logout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏳</div>
            <div>Loading tasks...</div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📝</div>
            <h3>No tasks yet</h3>
            <p>Create your first task to get started!</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary"
              style={{ marginTop: '20px' }}
            >
              + Add Your First Task
            </button>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
