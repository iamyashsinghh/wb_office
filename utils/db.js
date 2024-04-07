import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'wb',
  port: 3306,
  password: '123DeepakSir@',
  database: 'wb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const query = async (sql, values) => {
  const connection = await pool.getConnection();
  try {
    const [results, fields] = await connection.execute(sql, values);
    return results;
  } finally {
    connection.release();
  }
};


