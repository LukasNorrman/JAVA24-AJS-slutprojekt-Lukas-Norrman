import { TaskColumn } from "./TaskColumn";

export function TaskColumnsContainer({ tasks, teamMembers, onAssignTask, onMarkAsFinished, onDeleteTask }) {
  const newTasks = tasks.filter(task => task.status === 'new');
  const inProgressTasks = tasks.filter(task => task.status === 'in progress');
  const finishedTasks = tasks.filter(task => task.status === 'finished');

  return (
    <div className="task-columns-container">
      <TaskColumn
        title="New"
        tasks={newTasks}
        teamMembers={teamMembers} // Behövs för att kunna tilldela
        onAssignTask={onAssignTask}
        status="new"
      />
      <TaskColumn
        title="In Progress"
        tasks={inProgressTasks}
        onMarkAsFinished={onMarkAsFinished}
        status="in progress"
      />
      <TaskColumn
        title="Finished"
        tasks={finishedTasks}
        onDeleteTask={onDeleteTask}
        status="finished"
      />
    </div>
  );
}
