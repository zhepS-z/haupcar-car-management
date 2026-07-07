require('dotenv').config();
const db = require('./src/config/db');

console.log('Testing MySQL connection...\n');

// Test database connection
(async () => {
  try {
    console.log('Database Configuration:');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Database: ${process.env.DB_NAME}\n`);

    // Test connection
    const connection = await db.getConnection();
    console.log('Connected to MySQL successfully!\n');

    // Check if cars table exists
    const [tables] = await connection.query('SHOW TABLES LIKE "cars"');
    
    if (tables.length > 0) {
      console.log('cars table exists\n');

      // Check table structure
      const [columns] = await connection.query('DESCRIBE cars');
      console.log('Table Structure:');
      columns.forEach(col => {
        console.log(`   - ${col.Field} (${col.Type})${col.Null === 'NO' ? ' NOT NULL' : ''}`);
      });

      console.log('\n');

      // Check data
      const [rows] = await connection.query('SELECT * FROM cars');
      console.log(`Total records: ${rows.length}`);
      
      if (rows.length > 0) {
        console.log('\nSample data:');
        rows.forEach((row, idx) => {
          console.log(`   ${idx + 1}. ${row.registration_number} - ${row.brand} ${row.model}`);
        });
      }
    } else {
      console.log('cars table not found. Running init.sql...\n');
    }

    connection.release();
    console.log('\nAll tests passed! Database is ready.\n');
    process.exit(0);

  } catch (error) {
    console.error('Connection failed:');
    console.error(error.message);
    console.error('\nTroubleshooting:');
    console.error('   1. Ensure MySQL container is running: docker-compose ps');
    console.error('   2. Wait 30-60 seconds for MySQL to initialize');
    console.error('   3. Check environment variables in .env file');
    console.error('   4. View logs: docker-compose logs mysql\n');
    process.exit(1);
  }
})();
