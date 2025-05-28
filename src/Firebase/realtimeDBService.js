import { database } from "./firebaseconfig"; 
import {
  ref,         
  push,        
  set,          
  get,         
  update,      
  remove,             
  serverTimestamp 
} from "firebase/database";

const MEMBERS_PATH = 'members'; 
const TASKS_PATH = 'tasks';     

// Helper-funktion för att konvertera Firebase RTDB snapshot-objekt till array
const snapshotToArray = (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({
      id: key, // Använder Firebase-genererad nyckel som id
      ...data[key]
    }));
  }
  return [];
};

// --- Medlemmar ---
export const getMembers = async () => {
  try {
    const membersRef = ref(database, MEMBERS_PATH);
    const snapshot = await get(membersRef);
    const membersArray = snapshotToArray(snapshot);
    console.log("RTDBService: HÄMTADE MEDLEMMAR", membersArray);
    return membersArray;
  } catch (error) {
    console.error("Error getting members from RTDB: ", error);
    throw error;
  }
};

export const addMember = async (memberData) => {
  try {
    const membersListRef = ref(database, MEMBERS_PATH);
    const newMemberRef = push(membersListRef); 
    await set(newMemberRef, memberData);       
    console.log("RTDBService: LADE TILL MEDLEM med ID: ", newMemberRef.key);
    return { id: newMemberRef.key, ...memberData };
  } catch (error) {
    console.error("Error adding member to RTDB: ", error);
    throw error;
  }
};

// --- Uppgifter ---
export const getTasks = async () => {
  try {
    const tasksRef = ref(database, TASKS_PATH);
    const snapshot = await get(tasksRef);
    const tasksArray = snapshotToArray(snapshot);
    
    console.log("RTDBService: HÄMTADE UPPGIFTER", tasksArray);
    return tasksArray;
  } catch (error) {
    console.error("Error getting tasks from RTDB: ", error);
    throw error;
  }
};

export const addTask = async (taskDataFromApp) => {
  try {
    const tasksListRef = ref(database, TASKS_PATH);
    const newTaskRef = push(tasksListRef); 

    const newTaskData = {
      ...taskDataFromApp,
      status: 'new',
      memberId: null,
      memberName: null,
      timestamp: serverTimestamp() 
    };

    await set(newTaskRef, newTaskData);
    console.log("RTDBService: LADE TILL UPPGIFT med ID: ", newTaskRef.key);
    
    return {
      id: newTaskRef.key,
      ...taskDataFromApp,
      status: 'new',
      memberId: null,
      memberName: null,
      timestamp: Date.now() // Temporärt lokalt timestamp för UI
    };
  } catch (error) {
    console.error("Error adding task to RTDB: ", error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = ref(database, `${TASKS_PATH}/${taskId}`);
    await update(taskRef, updates); 
    console.log("RTDBService: UPPDATERADE UPPGIFT", taskId, updates);
  } catch (error) {
    console.error("Error updating task in RTDB: ", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const taskRef = ref(database, `${TASKS_PATH}/${taskId}`);
    await remove(taskRef);
    console.log("RTDBService: RADERADE UPPGIFT", taskId);
  } catch (error) {
    console.error("Error deleting task from RTDB: ", error);
    throw error;
  }
};