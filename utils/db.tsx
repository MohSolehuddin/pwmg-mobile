import * as SQLite from "expo-sqlite";

class DatabaseManager {
  private static instance: DatabaseManager;
  private readonly databaseName: string;
  private db: SQLite.WebSQLDatabase | null;

  private constructor() {
    this.databaseName = "databaseName";
    this.db = null;
  }

  // Menggunakan Singleton Pattern
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
      this.db = await SQLite.openDatabaseAsync(this.databaseName);
      console.log(`Connected to database: ${this.databaseName}`);
      return this.db;
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }

  // Mengambil data dari tabel
  public async getData(
    columns: string[],
    table: string,
    condition?: string
  ): Promise<any[]> {
    const db = await this.connectToDatabase();
    console.log("ini running");
    return new Promise((resolve, reject) => {
      const query = `SELECT ${columns.join(", ")} FROM ${table}${
        condition ? ` WHERE ${condition}` : ""
      }${";"}`;

      db.getAllAsync(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.error("Error executing query:", { query, error });
          reject(error);
        });

      //   console.log(query);
      //   db.transaction(
      //     (tx) => {
      //       tx.executeSql(
      //         query,
      //         [],
      //         (_, result) => {
      //           console.log("Result", result);
      //           resolve(result.rows._array || []);
      //         },
      //         (_, error) => {
      //           console.error("Error executing query:", { query, error });
      //           reject(error);
      //           return false;
      //         }
      //       );
      //     },
      //     (error) => {
      //       console.error("Transaction error:", error);
      //       reject(error);
      //     }
      //   );
    });
  }
}

export default DatabaseManager;
