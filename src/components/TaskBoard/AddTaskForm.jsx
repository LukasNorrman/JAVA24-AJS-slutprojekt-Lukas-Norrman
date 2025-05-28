import { useState } from "react";

const TASK_CATEGORIES = ["UX", "Frontend", "Backend"];

export function AddTaskForm({ onAddTask }) { 
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(TASK_CATEGORIES[0]); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!description.trim()) {
      alert("Vänligen fyll i en beskrivning för uppgiften.");
      return;
    }

    // Skapa ett uppgiftsobjekt. Timestamp och status läggs till i app.jsx
    const taskData = {
      description: description,
      category: category,
    };

    onAddTask(taskData); 

    setDescription('');
    setCategory(TASK_CATEGORIES[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h3>Lägg till ny uppgift</h3>
      <div>
        <label htmlFor="task-description">Beskrivning:</label>
        <input
          type="text"
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Vad behöver göras?"
          required
        />
      </div>
      <div>
        <label htmlFor="task-category">Kategori:</label>
        <select
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {TASK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Lägg till uppgift</button>
    </form>
  );
}
