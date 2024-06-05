create database sis_fact;
-- drop database sis_fact;
use sis_fact;

create table rol(
	ID_rol int auto_increment not null,
    Nombre_rol varchar(20) not null,
    primary key(ID_rol)
    );
    
create table Estado(
	ID_estado int auto_increment not null,
    Nombre_estado varchar(20) not null,
    primary key(ID_estado)
    );

create table Usuarios(
	Identificacion_Usuario varchar(30) not null,
    nombre varchar(20) not null,
    Apellido varchar(20) not null,
    email_usuario varchar(45) not  null, 
    Rol_Usuario int not null,
    Estado_Usuario int not null,
    Contrasena text not null,
    primary key (Identificacion_Usuario),
    foreign key (Rol_Usuario) references rol(ID_rol),
    foreign key (Estado_Usuario) references Estado(ID_estado)
);

create table Clientes(
	Identificacion_Clientes varchar(30) not null,
    nombre varchar(20) not null,
    Apellido varchar(20) not null,
    Estado_Clientes int not null,
    email varchar(45) not  null, 
    direccion varchar(45) not null,
    telefono bigint not null,
    primary key(Identificacion_Clientes),
	foreign key (Estado_Clientes) references Estado(ID_estado)
);

create table Factura(
	ID_factura int auto_increment not null,
    ID_cliente_fk varchar(30) not null,
    ID_vendedor_fk varchar(30) not null,
    fecha_venta_hora datetime not null,
    subtotal float not null,
    IVA float not null,
    total float not null,
    metodo_pago varchar(50),
    referencia_metodo_pago varchar(50),
    estado_fk int not null,
    primary key(ID_factura),
    foreign key(ID_cliente_fk) references Clientes(Identificacion_Clientes),
    foreign key(ID_vendedor_fk) references Usuarios(Identificacion_Usuario),
    foreign key(estado_fk) references Estado(ID_estado)
);

create table DetalleFactura(
	ID_detalle int auto_increment not null,
    ID_factura_fk int not null,
    descripcion varchar(40) not null,
    cantidad int not null,
    precio_unitario float not null,
    importe_total float not null,
    primary key (ID_detalle),
    foreign key (ID_factura_fk) references Factura(ID_factura)
);



create table Abonos(
	ID_abono int auto_increment not null,
    ID_factura_fk int not null,
    ID_Vendedor_fk varchar(30) not null,
    Metodo_Pago	varchar(30) not null,
    Desc_Abono varchar(200) not null,
    fecha_abono date not null,
    cantidad_abono float not null,
    primary key (ID_abono),
    foreign key (ID_factura_fk) references Factura(ID_factura),
    foreign key (ID_Vendedor_fk) references Usuarios(Identificacion_Usuario)
);


-- Tablas de zonas 
create table Zona(
	ID_zona int auto_increment not null,
    Nombre_zona varchar(35) not null,
    Estado_zona int not null,
    Id_empleado varchar(30) not null,
    primary key (ID_zona),
    foreign key (Estado_zona) references Estado(ID_estado),
    foreign key (Id_empleado) references Usuarios(Identificacion_Usuario)
);

create table Detalle_zona(
	ID_detallezona int auto_increment not null,
    ID_zonaFK int not null,
    Id_cliente varchar(30) not null,
    Direccion_clienteFK varchar(255) not null,
    primary key (ID_detallezona),
    foreign key (ID_zonaFK) references Zona(ID_zona),
    foreign key (Id_cliente) references Clientes(Identificacion_Clientes)
);

CREATE TABLE InformesVentas (
    ID int AUTO_INCREMENT PRIMARY KEY,
    ID_Vendedor varchar(30) NOT NULL,
    Nombre_Vendedor varchar(50) NOT NULL,
    Fecha_Ultima_Venta datetime NOT NULL,
    Total_Ventas float NOT NULL,
    Facturas_EVOS int NOT NULL,
    Estado varchar(50) NOT NULL
);


-- insert

insert into rol (Nombre_rol)
	values ('Supervisor'),
			('Vendedor');
            
-- select * from rol;

insert into Estado (Nombre_estado)
	values ('Inactivo'),
			('Activo'),
            ('Deuda'),
            ('Cancelado');
            
-- select * from Estado;

INSERT INTO Usuarios (Identificacion_Usuario, nombre, Apellido, email_usuario, Rol_Usuario, Estado_Usuario, Contrasena)
VALUES
('1001339605', 'Migue Angel', 'Ayala',"Emailusuario@gmail.com", 2, 2, 'Angel123'),
('1234567890', 'John', 'Doe',"Emailusuario@gmail.com", 1, 2, 'password123'),
('0987654321', 'Jane', 'Doe',"Emailusuario@gmail.com", 2, 2, 'password456'),
('2345678901', 'Bob', 'Smith',"Emailusuario@gmail.com", 2, 2, 'password789');

-- select * from Usuarios;

INSERT INTO Clientes (Identificacion_Clientes, nombre, Apellido, Estado_Clientes, email, direccion, telefono)
VALUES
('1234567890', 'Maria', 'Gomez', 2, 'maria@gmail.com', 'Carrera 10 #20-30', 123456789),
('0987654321', 'Juan', 'Perez', 2, 'juan@hotmail.com', 'Calle 50 #15-25', 987654321),
('2345678901', 'Luisa', 'Martinez', 2, 'luisa@yahoo.com', 'Avenida 80 #35-45', 234567890);

-- select * from Clientes;

INSERT INTO Factura (ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal, IVA, total, estado_fk, metodo_pago, referencia_metodo_pago)
VALUES
('1234567890', '0987654321', CURDATE(), 0, 0, 0, 3, 'Efectivo', 'Ref123'),
('0987654321', '2345678901', CURDATE(), 0, 0, 0, 3, 'Tarjeta', 'Ref456');

INSERT INTO DetalleFactura (ID_factura_fk, descripcion, cantidad, precio_unitario, importe_total)
VALUES
(1, 'Zapas y no copeo', 3, 70000, 70000 * 3),
(1, 'Ardidas', 7, 100000, 100000 * 7),
(2, 'Gorrita de ñero', 2, 35000, 35000 * 2),
(2, 'Pan duro', 4, 4000, 4000 * 4);

-- select * from Abonos;

INSERT INTO Zona (Nombre_zona, Estado_zona, Id_empleado) VALUES 
('Zona Norte', 1, '1234567890'),
('Zona Sur', 1, '0987654321'), 
('Zona Este', 1, '2345678901');


INSERT INTO Detalle_zona (ID_zonaFK, Id_cliente, Direccion_clienteFK) VALUES 
(1, '1234567890', 'Carrera 10 #20-30'),
(2, '0987654321', 'Calle 50 #15-25'),
(3, '2345678901', 'Avenida 80 #35-45');

select * from zona;
select * from Detalle_zona;
select * from Clientes;

select * from Factura;
select * from DetalleFactura;

INSERT INTO Clientes (Identificacion_Clientes, nombre, Apellido, Estado_Clientes, email, direccion, telefono)
VALUES
('3456789012', 'Pedro', 'Lopez', 2, 'pedro@gmail.com', 'Carrera 30 #10-20', 345678901),
('4567890123', 'Ana', 'Rodriguez', 2, 'ana@hotmail.com', 'Calle 25 #40-50', 456789012),
('5678901234', 'Carlos', 'Gonzalez', 2, 'carlos@yahoo.com', 'Avenida 50 #60-70', 567890123),
('6789012345', 'Laura', 'Sanchez', 2, 'laura@gmail.com', 'Carrera 40 #30-40', 678901234),
('7890123456', 'Diego', 'Ramirez', 2, 'diego@hotmail.com', 'Calle 60 #70-80', 789012345),
('8901234567', 'Sofia', 'Diaz', 2, 'sofia@yahoo.com', 'Avenida 70 #80-90', 890123456),
('9012345678', 'Alejandro', 'Fernandez', 2, 'alejandro@gmail.com', 'Carrera 20 #50-60', 901234567);


SELECT * FROM Detalle_zona WHERE ID_zonaFK = 4 AND Id_cliente = 3456789012;

-- Mas clientes
INSERT INTO Clientes (Identificacion_Clientes, nombre, Apellido, Estado_Clientes, email, direccion, telefono)
VALUES
('1000000001', 'Carlos Alberto', 'Garcia Lopez', 2, 'carlos.alberto@gmail.com', 'Calle 10 #15-25', 3001234567),
('1000000002', 'Laura Sofia', 'Martinez Gomez', 2, 'laura.sofia@hotmail.com', 'Carrera 50 #20-30', 3001234568),
('1000000003', 'Miguel Angel', 'Rodriguez Torres', 1, 'miguel.angel@yahoo.com', 'Avenida 80 #35-45', 3001234569),
('1000000004', 'Ana Maria', 'Perez Ramirez', 2, 'ana.maria@gmail.com', 'Diagonal 60 #10-20', 3001234570),
('1000000005', 'Luis Fernando', 'Gomez Sanchez', 2, 'luis.fernando@hotmail.com', 'Transversal 15 #45-55', 3001234571),
('1000000006', 'Maria Camila', 'Diaz Fernandez', 2, 'maria.camila@yahoo.com', 'Carrera 20 #25-35', 3001234572),
('1000000007', 'Juan Pablo', 'Lopez Gonzalez', 1, 'juan.pablo@gmail.com', 'Calle 30 #40-50', 3001234573),
('1000000008', 'Santiago Andres', 'Ramirez Martinez', 2, 'santiago.andres@hotmail.com', 'Avenida 90 #50-60', 3001234574),
('1000000009', 'Juliana Isabel', 'Torres Rodriguez', 2, 'juliana.isabel@yahoo.com', 'Carrera 70 #30-40', 3001234575),
('1000000010', 'Mateo Nicolas', 'Gomez Ruiz', 2, 'mateo.nicolas@gmail.com', 'Calle 40 #60-70', 3001234576),
('1000000011', 'Camila Andrea', 'Ramirez Perez', 2, 'camila.andrea@hotmail.com', 'Diagonal 30 #20-30', 3001234577),
('1000000012', 'Valentina Sofia', 'Fernandez Garcia', 1, 'valentina.sofia@yahoo.com', 'Transversal 10 #50-60', 3001234578),
('1000000013', 'Sebastian David', 'Rodriguez Diaz', 2, 'sebastian.david@gmail.com', 'Carrera 60 #70-80', 3001234579),
('1000000014', 'Isabella Mariana', 'Martinez Gomez', 2, 'isabella.mariana@hotmail.com', 'Avenida 100 #40-50', 3001234580),
('1000000015', 'Gabriel Alejandro', 'Perez Torres', 2, 'gabriel.alejandro@yahoo.com', 'Calle 20 #10-20', 3001234581),
('1000000016', 'Daniela Fernanda', 'Gomez Ramirez', 1, 'daniela.fernanda@gmail.com', 'Diagonal 50 #30-40', 3001234582),
('1000000017', 'Samuel Nicolas', 'Garcia Sanchez', 2, 'samuel.nicolas@hotmail.com', 'Transversal 5 #60-70', 3001234583),
('1000000018', 'Mariana Alejandra', 'Diaz Gonzalez', 2, 'mariana.alejandra@yahoo.com', 'Carrera 40 #20-30', 3001234584),
('1000000019', 'Andres Felipe', 'Torres Fernandez', 2, 'andres.felipe@gmail.com', 'Calle 50 #30-40', 3001234585),
('1000000020', 'Manuela Victoria', 'Perez Martinez', 2, 'manuela.victoria@hotmail.com', 'Avenida 70 #40-50', 3001234586),
('1000000021', 'Diego Alejandro', 'Gomez Rodriguez', 1, 'diego.alejandro@yahoo.com', 'Diagonal 20 #50-60', 3001234587),
('1000000022', 'Natalia Sofia', 'Ramirez Gomez', 2, 'natalia.sofia@gmail.com', 'Transversal 30 #10-20', 3001234588),
('1000000023', 'Martin Santiago', 'Garcia Torres', 2, 'martin.santiago@hotmail.com', 'Carrera 50 #70-80', 3001234589),
('1000000024', 'Lucia Maria', 'Gonzalez Ramirez', 2, 'lucia.maria@yahoo.com', 'Calle 70 #30-40', 3001234590),
('1000000025', 'David Esteban', 'Perez Sanchez', 2, 'david.esteban@gmail.com', 'Avenida 80 #40-50', 3001234591),
('1000000026', 'Paula Andrea', 'Gomez Diaz', 1, 'paula.andrea@hotmail.com', 'Diagonal 30 #20-30', 3001234592),
('1000000027', 'Jorge Luis', 'Martinez Gonzalez', 2, 'jorge.luis@yahoo.com', 'Transversal 40 #60-70', 3001234593),
('1000000028', 'Mariana Isabel', 'Rodriguez Perez', 2, 'mariana.isabel@gmail.com', 'Carrera 10 #50-60', 3001234594),
('1000000029', 'Felipe Andres', 'Garcia Ramirez', 2, 'felipe.andres@hotmail.com', 'Calle 60 #30-40', 3001234595),
('1000000030', 'Sofia Victoria', 'Torres Martinez', 2, 'sofia.victoria@yahoo.com', 'Avenida 90 #20-30', 3001234596),
('1000000031', 'Juan Diego', 'Ramirez Gonzalez', 1, 'juan.diego@gmail.com', 'Diagonal 70 #40-50', 3001234597),
('1000000032', 'Laura Maria', 'Perez Sanchez', 2, 'laura.maria@hotmail.com', 'Transversal 10 #60-70', 3001234598),
('1000000033', 'Daniel Santiago', 'Garcia Diaz', 2, 'daniel.santiago@yahoo.com', 'Carrera 20 #50-60', 3001234599),
('1000000034', 'Carolina Andrea', 'Martinez Torres', 2, 'carolina.andrea@gmail.com', 'Calle 50 #40-50', 3001234600),
('1000000035', 'Javier Alejandro', 'Gomez Ramirez', 2, 'javier.alejandro@hotmail.com', 'Avenida 60 #10-20', 3001234601),
('1000000036', 'Valeria Sofia', 'Diaz Gonzalez', 1, 'valeria.sofia@yahoo.com', 'Diagonal 40 #50-60', 3001234602),
('1000000037', 'Luis Miguel', 'Garcia Martinez', 2, 'luis.miguel@gmail.com', 'Transversal 20 #30-40', 3001234603),
('1000000038', 'Camilo Andres', 'Perez Torres', 2, 'camilo.andres@hotmail.com', 'Carrera 70 #40-50', 3001234604),
('1000000039', 'Alejandra Isabel', 'Gonzalez Ramirez', 2, 'alejandra.isabel@yahoo.com', 'Calle 80 #10-20', 3001234605),
('1000000040', 'Oscar Eduardo', 'Torres Martinez', 2, 'oscar.eduardo@gmail.com', 'Avenida 20 #50-60', 3001234606);

select * from Abonos;

INSERT INTO Abonos (ID_factura_fk,ID_Vendedor_fk, fecha_abono, cantidad_abono,Desc_Abono,Metodo_Pago)
VALUES 
    (1,2345678901, CURDATE(), 1000.00,'Se hara el pago cuanto tenga la plata','Efectivo'),
    (1,1234567890, CURDATE(), 500.00,'Se hara el pago cuanto tenga la plata','Transferencia'),
	(1,2345678901, CURDATE(), 40200.00,'Se hara el pago cuanto tenga la plata','Efectivo');
    
INSERT INTO Abonos (ID_factura_fk,ID_Vendedor_fk, fecha_abono, cantidad_abono,Desc_Abono,Metodo_Pago)
VALUES 
    (2,1234567890, CURDATE(), 20000.00,'Se haran los pagos en el tiempo Establecido','Tarjeta'),
    (2,2345678901, CURDATE(), 7000.00,'Se haran los pagos en el tiempo Establecido','Tarjeta');
    
INSERT INTO InformesVentas (ID_Vendedor, Nombre_Vendedor, Fecha_Ultima_Venta, Total_Ventas, Facturas_EVOS, Estado)
VALUES
    ('0987654321', 'Jane Doe', '2024-05-28 15:30:00', 2500000.00, 5, 'Mayor que la vez pasada'),
    ('2345678901', 'Bob Smith', '2024-05-27 10:45:00', 1500000.00, 3, 'Peor que la vez pasada'),
    ('1234567890', 'John Doe', '2024-05-26 09:20:00', 3000000.00, 8, 'Mayor que la vez pasada');
    
