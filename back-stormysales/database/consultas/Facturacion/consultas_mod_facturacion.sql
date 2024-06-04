/* Coonsultas para Facturacion */

USE sis_fact;

select * from Factura;
select * from DetalleFactura;

-- Consultar todas las facturas.
SELECT 
	ID_factura AS "ID_factura",
    ID_cliente_fk AS "ID_cliente",
    ID_vendedor_fk AS "ID_vendedor",
    fecha_venta_hora AS "fecha",
    subtotal,
    IVA,
    total,
    E.Nombre_estado AS "estado_factura"
From Factura F
INNER JOIN Estado E
	ON E.ID_estado = F.estado_fk ;

-- Consultar todas las facturas y sus detalles.
SELECT 
	F.ID_factura AS "ID_factura",
    F.ID_cliente_fk AS "ID_cliente",
    F.ID_vendedor_fk AS "ID_vendedor",
    F.fecha_venta_hora AS "fecha_factura",
    F.subtotal AS "subtotal_factura",
    DF.descripcion AS "desc_Producto",
    DF.cantidad  AS "cantidad_Producto",
    DF.precio_unitario AS "precio_unitario_Producto",
    F.IVA AS "fecha_factura",
    F.total AS "total_factura",
    E.Nombre_estado AS "estado_factura"
From Factura F
INNER JOIN DetalleFactura DF
	ON DF.ID_factura_fk  = F.ID_factura
INNER JOIN Estado E
	ON E.ID_estado = F.estado_fk 
WHERE F.ID_factura = 1;


INSERT INTO DetalleFactura (ID_factura_fk, descripcion, cantidad, precio_unitario, importe_total)
VALUES
		(1,'Zapas y no copeo',3,70000,70000*3),
        (1,'Ardidas',7,100000,100000*7);
        
INSERT INTO Factura (ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal,IVA, total, estado_fk)
VALUES
		('1234567890', '0987654321', '', 0,0, 0, 3),
		('0987654321', '2345678901', '', 0,0, 0, 3);
        
-- ----------------------------
SELECT 
	Identificacion_Clientes AS "ID_cliente",
	nombre AS "Nombre",
	Apellido AS "Apellido",
	email AS "Email",
	direccion AS "Direccion",
	telefono AS "Telefono"
FROM Clientes
WHERE Estado_Clientes = 2;






