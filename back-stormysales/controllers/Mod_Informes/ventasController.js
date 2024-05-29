const db = require('../../models/modelStormySales').promise();

const getVentas = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          ID_Vendedor as id,
          Nombre_Vendedor as name,
          Fecha_Ultima_Venta as lastSaleDate,
          Total_Ventas as totalSales,
          Facturas_EVOS as acEVOSInvoices,
          Estado as status
        FROM 
          InformesVentas;
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getVentas,
  };
