import * as SQLite from "expo-sqlite";

class DatabaseManager {
  private static instance: DatabaseManager;
  private readonly databaseName: string;
  private db: SQLite.SQLiteDatabase | null;

  private constructor() {
    this.databaseName = "databaseName";
    this.db = null;
  }

  // Singleton Pattern
  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  // Membuka koneksi ke database
  public connectToDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      this.db = SQLite.openDatabase(this.databaseName);
      console.log(`Connected to database: ${this.databaseName}`);
    }
    return this.db;
  }

  // Inisialisasi tabel jika belum ada
  public initializeDatabase(): Promise<void> {
    const db = this.connectToDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS test (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              category TEXT,
              username TEXT,
              password TEXT,
              pin TEXT,
              email TEXT
            );`,
            [],
            () => {
              console.log("Table initialized successfully.");
              resolve();
            },
            (_, error) => {
              console.error("Failed to initialize table:", error);
              reject(error);
              return false;
            }
          );
        },
        (error) => {
          console.error("Transaction error during initialization:", error);
          reject(error);
        }
      );
    });
  }

  // Mengambil data dari tabel
  public getData(
    columns: string[],
    table: string,
    condition?: string
  ): Promise<any[]> {
    const db = this.connectToDatabase();
    return new Promise((resolve, reject) => {
      const query = `SELECT ${columns.join(", ")} FROM ${table}${
        condition ? ` WHERE ${condition}` : ""
      };`;
      db.transaction(
        (tx) => {
          tx.executeSql(
            query,
            [],
            (_, result) => {
              resolve(result.rows._array || []);
            },
            (_, error) => {
              console.error("Error executing query:", { query, error });
              reject(error);
              return false;
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
  }

  // Menyimpan data ke tabel
  public savePassword(
    category: string,
    username: string,
    password: string,
    pin: string,
    email: string
  ): Promise<void> {
    const db = this.connectToDatabase();
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO test (category, username, password, pin, email) VALUES (?, ?, ?, ?, ?)",
            [category, username, password, pin, email],
            () => {
              console.log("Data saved successfully.");
              resolve();
            },
            (_, error) => {
              console.error("Error executing query:", error);
              reject(error);
              return false;
            }
          );
        },
        (error) => {
          console.error("Transaction error:", error);
          reject(error);
        }
      );
    });
  }
}

export default DatabaseManager;
