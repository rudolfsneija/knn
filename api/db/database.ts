import * as sqlite3 from 'sqlite3';
import { promisify } from 'util';
import * as path from 'path';

// Enable verbose mode for better debugging
const sqlite = sqlite3.verbose();

// Database file path
const DB_PATH = path.join(process.cwd(), 'database.sqlite');

// Database instance
let db: sqlite3.Database;

// Promisified database methods for async/await usage
export interface DatabaseMethods {
  run: (sql: string, params?: any[]) => Promise<sqlite3.RunResult>;
  get: (sql: string, params?: any[]) => Promise<any>;
  all: (sql: string, params?: any[]) => Promise<any[]>;
  close: () => Promise<void>;
}

// Initialize database connection
export async function initDatabase(): Promise<DatabaseMethods> {
  return new Promise((resolve, reject) => {
    db = new sqlite.Database(DB_PATH, (err: Error | null) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }
      console.log(`Connected to SQLite database at ${DB_PATH}`);
      
      // Create tables
      createTables()
        .then(() => {
          const methods = createDatabaseMethods();
          resolve(methods);
        })
        .catch(reject);
    });
  });
}

// Create promisified database methods
function createDatabaseMethods(): DatabaseMethods {
  return {
    run: (sql: string, params?: any[]) => {
      return new Promise<sqlite3.RunResult>((resolve, reject) => {
        db.run(sql, params || [], function(this: sqlite3.RunResult, err: Error | null) {
          if (err) reject(err);
          else resolve({ lastID: this.lastID, changes: this.changes } as sqlite3.RunResult);
        });
      });
    },
    get: (sql: string, params?: any[]) => {
      return new Promise<any>((resolve, reject) => {
        db.get(sql, params || [], (err: Error | null, row: any) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    },
    all: (sql: string, params?: any[]) => {
      return new Promise<any[]>((resolve, reject) => {
        db.all(sql, params || [], (err: Error | null, rows: any[]) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },
    close: () => {
      return new Promise<void>((resolve, reject) => {
        db.close((err: Error | null) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
  };
}

// Create database tables
async function createTables(): Promise<void> {
  const runAsync = promisify(db.run.bind(db));

  // Users table
  await runAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Aktualitātes (News/Updates) table for admin content management
  await runAsync(`
    CREATE TABLE IF NOT EXISTS aktualitates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      image_url VARCHAR(500),
      published BOOLEAN DEFAULT 0,
      admin_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Produkti (Products) table for admin product management
  await runAsync(`
    CREATE TABLE IF NOT EXISTS produkti (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2),
      category VARCHAR(100),
      image_url VARCHAR(500),
      sub_category VARCHAR(100), -- Optional sub-category for more specific classification
      gallery_urls TEXT, -- JSON array of image URLs
      specifications TEXT, -- JSON object for technical specs
      available BOOLEAN DEFAULT 1,
      featured BOOLEAN DEFAULT 0,
      admin_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Images table for storing uploaded images with metadata
  await runAsync(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid VARCHAR(36) UNIQUE NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      file_size INTEGER NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      width INTEGER,
      height INTEGER,
      entity_type VARCHAR(50) NOT NULL, -- 'produkts' or 'aktualitates'
      entity_id INTEGER NOT NULL,
      is_main BOOLEAN DEFAULT 0, -- Main image for the entity
      admin_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Run migrations for existing databases
  try {
    // Add sub_category column if it doesn't exist (migration)
    await runAsync(`ALTER TABLE produkti ADD COLUMN sub_category VARCHAR(100)`);
    console.log('Added sub_category column to produkti table');
  } catch (error: any) {
    if (error.message && (error.message.includes('duplicate column') || error.message.includes('already exists'))) {
      console.log('sub_category column already exists in produkti table');
    } else {
      console.warn('Error adding sub_category column (this is normal if column already exists):', error.message);
    }
  }

  // Create indexes for better performance
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_aktualitates_admin_id ON aktualitates(admin_id)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_aktualitates_published ON aktualitates(published)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_produkti_admin_id ON produkti(admin_id)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_produkti_available ON produkti(available)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_produkti_featured ON produkti(featured)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_produkti_category ON produkti(category)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_produkti_sub_category ON produkti(sub_category)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_images_entity ON images(entity_type, entity_id)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_images_uuid ON images(uuid)`);
  await runAsync(`CREATE INDEX IF NOT EXISTS idx_images_admin_id ON images(admin_id)`);

  console.log('Database tables created successfully');
}

// Get database instance
export function getDatabase(): sqlite3.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

// Close database connection
export async function closeDatabase(): Promise<void> {
  if (db) {
    const close = promisify(db.close.bind(db));
    await close();
    console.log('Database connection closed');
  }
}

// Database query helper with error handling
export async function query(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: any) => {
      if (err) {
        console.error('Database query error:', err);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Database query helper for multiple rows
export async function queryAll(sql: string, params: any[] = []): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err: Error | null, rows: any[]) => {
      if (err) {
        console.error('Database query error:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Database run helper for INSERT, UPDATE, DELETE
export async function run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        console.error('Database run error:', err);
        reject(err);
      } else {
        resolve({
          lastID: this.lastID,
          changes: this.changes
        } as sqlite3.RunResult);
      }
    });
  });
}
