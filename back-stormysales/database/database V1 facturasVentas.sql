
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
    ID_cliente_fk varchar(30) not  null,
    ID_vendedor_fk varchar(30) not null,
    fecha_venta_hora datetime not null,
    subtotal float not null,
    IVA float not null,
    total float not  null,
    estado_fk int not null,
    primary key(ID_factura),
    foreign key(ID_cliente_fk)  references Clientes(Identificacion_Clientes),
    foreign key(ID_vendedor_fk)  references Usuarios(Identificacion_Usuario),
    foreign key(estado_fk)  references Estado(ID_estado)
);

create table DetalleFactura(
	ID_detalle int auto_increment not null,
    ID_factura_fk int not null,
    descripcion varchar(25) not null,
    cantidad int not null,
    precio_unitario float not null,
    importe_total float not null,
    primary key (ID_detalle),
    foreign key (ID_factura_fk) references Factura(ID_factura)
);


create table Abonos(
	ID_abono int auto_increment not null,
    ID_factura_fk int not null,
    fecha_abono date not null,
    cantidad_abono float not null,
    primary key (ID_abono),
    foreign key (ID_factura_fk) references Factura(ID_factura)
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
    Direccion_clienteFK varchar(45) not null,
    primary key (ID_detallezona),
    foreign key (ID_zonaFK) references Zona(ID_zona),
    foreign key (Id_cliente) references Clientes(Identificacion_Clientes)
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

INSERT INTO Factura (ID_cliente_fk, ID_vendedor_fk, fecha_venta_hora, subtotal,IVA, total, estado_fk)
VALUES
		('1234567890', '0987654321', CURDATE(), 0,0, 0, 3),
		('0987654321', '2345678901', CURDATE(), 0,0, 0, 3);
		
-- select * from Factura;

INSERT INTO DetalleFactura (ID_factura_fk, descripcion, cantidad, precio_unitario, importe_total)
VALUES
		(1,'Zapas y no copeo',3,70000,70000*3),
        (1,'Ardidas',7,100000,100000*7);
        
INSERT INTO DetalleFactura (ID_factura_fk, descripcion, cantidad, precio_unitario, importe_total)
VALUES
		(2,'Gorrita de ñero',2,35000,35000*2),
        (2,'Pan duro',4,4000,4000*4);



INSERT INTO Zona (Nombre_zona, Estado_zona, Id_empleado) VALUES 
('Zona Norte', 1, '1234567890'),
('Zona Sur', 1, '0987654321'), 
('Zona Este', 1, '2345678901');


INSERT INTO Detalle_zona (ID_zonaFK, Id_cliente, Direccion_clienteFK) VALUES 
(1, '1234567890', 'Carrera 10 #20-30'),
(2, '0987654321', 'Calle 50 #15-25'),
(3, '2345678901', 'Avenida 80 #35-45');

select * from zona;

SELECT Identificacion_Usuario as id,Contrasena,Rol_Usuario as rol,nombre,Apellido,Estado_Usuario as estado
                                        FROM Usuario WHERE ID_Numero_Identificacion_PK = ?;