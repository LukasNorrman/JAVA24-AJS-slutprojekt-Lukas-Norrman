import TaskCard from "./TaskCard";

export function TaskColumn({ title, tasks, teamMembers, onAssignTask, onMarkAsFinished, onDeleteTask, status }) {
  return (
    <div className="task-column">
      <h3>{title} ({tasks.length})</h3>
      {tasks.length === 0 && <p>Inga uppgifter här.</p>}
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          teamMembers={teamMembers} // Skicka vidare, TaskCard kan behöva den för 'assign'
          onAssignTask={onAssignTask}
          onMarkAsFinished={onMarkAsFinished}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
