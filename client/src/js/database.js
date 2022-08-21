import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade (db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to accept content and add to db
export const putDb = async (id, content) => {
  console.log('PUT to the database');

  // Connection to db and version
  const jateDb = await openDB('jate', 1);

  // New transition and select db and data permits
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open object store
  const store = tx.objectStore('jate');

  const request = store.put({ id: id, content: content });

  // Confirm request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Get all content from db
export const getDb = async () => {
  console.log('GET from the database');

  // Connection to db and version
  const jateDb = await openDB('jate', 1);

   // New transition and select db and data permits
  const tx = jateDb.transaction('jate', 'readonly');

  // Open object store.
  const store = tx.objectStore('jate');

  // Get all data in db
  const request = store.getAll();

  // Confirm request
  const result = await request;
  console.log('result.value', result);
};

initdb();
