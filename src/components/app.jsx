import { useState, useEffect, useMemo } from "react";
import { AddMemberForm } from "./TeamManagement/AddMemberForm";
import { AddTaskForm } from "./TaskBoard/AddTaskForm";
import { MemberList } from "./TeamManagement/MemberList";
import { FilterSortControls } from "./TaskBoard/SortFilterControls";
import { TaskColumnsContainer } from "./TaskBoard/TaskColumnContainer";
import { addMember, deleteTask, updateTask, getTasks, getMembers, addTask } from "../Firebase/realtimeDBService"; 

export function App() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilters, setActiveFilters] = useState({ category: '', memberId: '' });
  const [sortCriteria, setSortCriteria] = useState({ field: 'timestamp', order: 'desc' });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const members = await getMembers();
        setTeamMembers(members);
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError(`Kunde inte ladda data: ${err.message}`);
        console.error("FetchData Error:", err); 
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddMember = async (memberData) => {
    try {
      const newMember = await addMember(memberData);
      setTeamMembers(prevMembers => [...prevMembers, newMember]);
    } catch (err) {
      setError(`Kunde inte lägga till medlem: ${err.message}`);
      console.error("AddMember Error:", err);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError(`Kunde inte lägga till uppgift: ${err.message}`);
      console.error("AddTask Error:", err);
    }
  };

  const handleAssignTask = async (taskId, memberId) => {
    setError(null);
    const taskToAssign = tasks.find(t => t.id === taskId);
    const memberToAssign = teamMembers.find(m => m.id === memberId);

    if (!taskToAssign || !memberToAssign) {
      setError("Uppgift eller medlem hittades inte.");
      return;
    }
    if (taskToAssign.category.toLowerCase() !== memberToAssign.role.toLowerCase()) {
      setError(`Fel: ${memberToAssign.name} (${memberToAssign.role}) kan inte tilldelas en ${taskToAssign.category}-uppgift.`);
      return;
    }

    try {
      const updatedTaskData = { status: 'in progress', memberId: memberId, memberName: memberToAssign.name };
      await updateTask(taskId, updatedTaskData);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (err) {
      setError(`Kunde inte tilldela uppgift: ${err.message}`);
      console.error("AssignTask Error:", err);
    }
  };

  const handleMarkAsFinished = async (taskId) => {
    try {
      const updatedTaskData = { status: 'finished' };
      await updateTask(taskId, updatedTaskData);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (err) {
      setError(`Kunde inte markera som klar: ${err.message}`);
      console.error("MarkAsFinished Error:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(`Kunde inte radera uppgift: ${err.message}`);
      console.error("DeleteTask Error:", err);
    }
  };

  const displayedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (activeFilters.category) {
      filtered = filtered.filter(task => task.category === activeFilters.category);
    }
    if (activeFilters.memberId) {
      filtered = filtered.filter(task => task.memberId === activeFilters.memberId && task.status === 'in progress');
    }
    
    filtered.sort((a, b) => {
      if (sortCriteria.field === 'timestamp') {
        return sortCriteria.order === 'asc' ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      }
      if (sortCriteria.field === 'title') {
        const titleA = a.description.toLowerCase();
        const titleB = b.description.toLowerCase();
        if (titleA < titleB) return sortCriteria.order === 'asc' ? -1 : 1;
        if (titleA > titleB) return sortCriteria.order === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

    return filtered;
  }, [tasks, activeFilters, sortCriteria]);


  if (isLoading) return <p>Laddar data...</p>;

  return (
    <div className="app-container">
      <header>
        <h1>Scrum Board</h1>
      </header>
      {error && <div className="error-message">{error}</div>}
      
      <section className="team-management-section">
        <h2>Team Management</h2>
        <AddMemberForm onAddMember={handleAddMember} />
        <MemberList members={teamMembers} />
      </section>

      <section className="task-board-section">
        <h2>Task Board</h2>
        <AddTaskForm onAddTask={handleAddTask} />
        <FilterSortControls
          teamMembers={teamMembers}
          activeFilters={activeFilters}
          sortCriteria={sortCriteria}
          onFilterChange={setActiveFilters}
          onSortChange={setSortCriteria}
        />
        <TaskColumnsContainer
          tasks={displayedTasks}
          teamMembers={teamMembers}
          onAssignTask={handleAssignTask}
          onMarkAsFinished={handleMarkAsFinished}
          onDeleteTask={handleDeleteTask}
        />
      </section>
    </div>
  );
}