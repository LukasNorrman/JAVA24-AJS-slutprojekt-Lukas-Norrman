import { useState } from "react";

const ROLES = ["UX", "Frontend", "Backend"]; // Definerade roller


export function AddMember(){
    let tempMember = '';
    

    function handleSubmit(event){
        event.preventDefault();
        console.log(tempMember);
        event.target.reset();
        

    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={event => tempMember = event.target.value} 
            type="text" placeholder="Add Member"  required/>
             <select name="" id="assign" onChange={event => console.log(event.target.value)}>
                <option value="ux">"Ux"</option>
                <option value="frontend">"Frontend"</option>
                <option value="backend">"Backend"</option>
            </select>
            <button >Add</button>
        </form>

    )
}


export function AddMemberForm({ onAddMember }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(ROLES[0]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !role) {
      alert("Fyll i namn och välj en roll.");
      return;
    }
    onAddMember({ name, role });
    setName('');
    setRole(ROLES[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Lägg till teammedlem</h3>
      <input
        type="text"
        placeholder="Namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <button type="submit">Lägg till medlem</button>
    </form>
  );
}
