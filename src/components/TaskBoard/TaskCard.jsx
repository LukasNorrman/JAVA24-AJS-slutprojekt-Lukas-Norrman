import { useState } from "react";

function TaskCard({ task, teamMembers, onAssignTask, onMarkAsFinished, onDeleteTask }) {
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const handleAssignClick = () => {
    if (!selectedMemberId) {
      alert("Välj en medlem att tilldela uppgiften till.");
      return;
    }
    onAssignTask(task.id, selectedMemberId);
    setSelectedMemberId(''); 
  };

  // Filtrera medlemmar så att endast de med matchande roll för uppgiftens kategori visas
  const assignableMembers = teamMembers 
    ? teamMembers.filter(member => member.role.toLowerCase() === task.category.toLowerCase())
    : [];

  return (
    <div className={`task-card status-${task.status}`}>
      <h4>{task.description}</h4>
      <p>Kategori: {task.category}</p>
      <p>Skapad: {new Date(task.timestamp).toLocaleString()}</p>
      {task.memberId && <p>Tilldelad: {task.memberName || task.memberId}</p>}

      {task.status === 'new' && onAssignTask && (
        <div className="task-actions">
          <select value={selectedMemberId} onChange={(e) => setSelectedMemberId(e.target.value)}>
            <option value="">Välj medlem...</option>
            {assignableMembers.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
          {assignableMembers.length === 0 && <p><small>Inga medlemmar med rollen {task.category}.</small></p>}
          <button onClick={handleAssignClick} disabled={!selectedMemberId || assignableMembers.length === 0}>Tilldela</button>
        </div>
      )}

      {task.status === 'in progress' && onMarkAsFinished && (
        <div className="task-actions">
          <button onClick={() => onMarkAsFinished(task.id)}>Markera som klar</button>
        </div>
      )}

      {task.status === 'finished' && onDeleteTask && (
        <div className="task-actions">
          <button onClick={() => onDeleteTask(task.id)} className="delete-button">Radera</button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;