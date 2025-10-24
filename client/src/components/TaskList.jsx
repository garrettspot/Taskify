import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  };

  return (
    <div>
      {tasks.map(task => (
        <div
          key={task._id}
          className={`task-item ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-title">
            {task.title}
          </div>
          
          {task.description && (
            <div className="task-description">
              {task.description}
            </div>
          )}

          <div className="task-meta">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
              
              {task.dueDate && (
                <span style={{ 
                  fontSize: '14px', 
                  color: '#6c757d',
                  backgroundColor: '#f8f9fa',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  📅 {formatDate(task.dueDate)}
                </span>
              )}
            </div>

            <div className="task-actions">
              <button
                onClick={() => onToggleComplete(task._id)}
                className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              
              <button
                onClick={() => onEdit(task)}
                className="btn btn-sm btn-secondary"
              >
                Edit
              </button>
              
              <button
                onClick={() => onDelete(task._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
