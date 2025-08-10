const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');

const db = new Database('database.sqlite');
const password = 'your-secure-password';
const hashedPassword = bcrypt.hashSync(password, 10);

db.prepare(`
  INSERT INTO users (username, email, password_hash, first_name, last_name)
  VALUES (?, ?, ?, ?, ?)
`).run('newadmin', 'admin@example.com', hashedPassword, 'Admin', 'User');

console.log('Admin user created successfully');