// db.js
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  users: '++id, username, password', // Primary key and indexed props
  tasks: '++id, userId, username, title, dueDate, status'
});
