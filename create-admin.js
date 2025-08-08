#!/usr/bin/env node
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

// Configuration - UPDATE THESE VALUES
const ADMIN_USER = {
  username: 'admin',           // Change this to your desired username
  email: 'info@knn.lv',      // Change this to your email
  password: 'Sarkangalv1t)',  // Change this to your secure password
  first_name: 'Admin',        // Optional: Your first name
  last_name: 'User'           // Optional: Your last name
};

async function createAdminUser() {
  return new Promise((resolve, reject) => {
    // Open database
    const db = new sqlite3.Database('./database.sqlite', (err) => {
      if (err) {
        console.error('❌ Error opening database:', err.message);
        reject(err);
        return;
      }
    });
    
    // Hash the password and insert user
    bcrypt.hash(ADMIN_USER.password, 12, (err, hashedPassword) => {
      if (err) {
        console.error('❌ Error hashing password:', err.message);
        db.close();
        reject(err);
        return;
      }

      const sql = `
        INSERT INTO users (username, email, password_hash, first_name, last_name, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `;
      
      db.run(sql, [
        ADMIN_USER.username,
        ADMIN_USER.email,
        hashedPassword,
        ADMIN_USER.first_name,
        ADMIN_USER.last_name
      ], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            console.log('❌ Admin user already exists or username/email is taken');
          } else {
            console.error('❌ Error creating admin user:', err.message);
          }
          db.close();
          reject(err);
          return;
        }
        
        console.log('✅ Admin user created successfully!');
        console.log(`👤 Username: ${ADMIN_USER.username}`);
        console.log(`📧 Email: ${ADMIN_USER.email}`);
        console.log(`🆔 User ID: ${this.lastID}`);
        console.log('');
        console.log('🔐 You can now log in with:');
        console.log(`   Username: ${ADMIN_USER.username}`);
        console.log(`   Password: ${ADMIN_USER.password}`);
        
        db.close((err) => {
          if (err) {
            console.error('❌ Error closing database:', err.message);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  });
}

createAdminUser().catch(console.error);
