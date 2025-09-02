import mysql from 'mysql2/promise';

['DB_HOST','DB_USER','DB_PASSWORD','DB_NAME'].forEach(key => {
  if (!process.env[key]) {
    console.warn(`WARNING: Environment variable ${key} is not set`);
  }
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_directory',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
