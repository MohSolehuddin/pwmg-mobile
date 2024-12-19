import * as SQLite from "expo-sqlite";

class DatabaseManager {
  private static instance: DatabaseManager;
  private readonly databaseName: string;
  private db: SQLite.WebSQLDatabase | null;

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
  public async connectToDatabase(): Promise<SQLite.WebSQLDatabase> {
    if (this.db) return this.db;

    try {
      this.db = SQLite.openDatabase(this.databaseName);
      console.log(`Connected to database: ${this.databaseName}`);
      return this.db;
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }

  // Inisialisasi tabel jika belum ada
  public async initializeDatabase(): Promise<void> {
    const db = await this.connectToDatabase();
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
  public async getData(
    columns: string[],
    table: string,
    condition?: string
  ): Promise<any[]> {
    const db = await this.connectToDatabase();
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

  public async closeDatabase(): Promise<void> {
    const db = await this.connectToDatabase();
    db.close();
  }

  public async saveData() {
    const db = await this.connectToDatabase();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO test (value, intValue) VALUES (?, ?)",
          ["test1", 123],
          (_, result) => {
            console.log("Result", result);
          },
          (_, error) => {
            console.error("Error executing query:", error);
            return false;
          }
        );
      },
      (error) => {
        console.error("Transaction error:", error);
      }
    );
  }

  public async savePassword(
    category: string,
    username: string,
    password: string,
    pin: string,
    email: string
  ) {
    const db = await this.connectToDatabase();
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO test (category, username, password, pin, email) VALUES (?, ?, ?, ?, ?)",
          [category, username, password, pin, email],
          (_, result) => {
            console.log("Result", result);
          },
          (_, error) => {
            console.error("Error executing query:", error);
            return false;
          }
        );
      },
      (error) => {
        console.error("Transaction error:", error);
      }
    );
  }
}

export default DatabaseManager;
