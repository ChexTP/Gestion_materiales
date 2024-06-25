import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'reto1senasoft',
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado a la base de datos');
        connection.release();
        return true;
    } catch (err) {
        console.error('Error conectándose a la base de datos:', err.message);
        return false;
    }
};

export { pool, checkConnection };
