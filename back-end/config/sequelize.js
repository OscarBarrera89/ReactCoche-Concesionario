
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ventaCoches', 
    'root',  
    'test',  
    { 
        host: 'localhost', 
        port: 3306, 
        dialect: 'mysql' 
    });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos MySQL');
    } catch (error) {
        console.error('Error de conexión:', error);
    }
})();

module.exports = sequelize; // Exportar la instancia de Sequelize para usarla en otros archivos