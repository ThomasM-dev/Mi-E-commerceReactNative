import * as SQLite from 'expo-sqlite';

export const init = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('session.db');
    const createTable = await db.execAsync(`
        CREATE TABLE IF NOT EXISTS sessionUser (
          localId TEXT PRIMARY KEY NOT NULL,
          email TEXT NOT NULL,
          idToken TEXT NOT NULL
        )
      `);
    return createTable;
  } catch (error) {
    return error;
  }
};

export const insertSession = () => {
  try {
  } catch (error) {}
};

export const fetchSession = () => {};

export const deleteSession = () => {};
