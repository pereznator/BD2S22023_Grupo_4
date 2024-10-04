CREATE TABLE bodegas (
    codigo text PRIMARY KEY,
    capacidad int,
    cuartos_frios LIST<FROZEN<TUPLE<TEXT, DECIMAL, DECIMAL>>>
);

CREATE TABLE productos_por_bodega (
    codigo_bodega text,
    codigo_producto uuid,
    capacidad_bodega int,
    capacidad_cuarto_frio int,
    codigo_cuarto_frio text,
    fabricante_producto text,
    marca_producto text,
    nombre_producto text,
    precio_producto decimal,
    PRIMARY KEY (codigo_bodega, codigo_producto)
) WITH CLUSTERING ORDER BY (codigo_producto ASC);

CREATE TABLE clientes (
    codigo, uuid PRIMARY KEY,
    descuento, decimal,
    direccion, text,
    nombre, text,
    representante_legal, text,
    telefono, text,
    tipo, text
);

CREATE TABLE detalles_pedido (
    pedido_id uuid,
    codigo_producto uuid,
    cantidad int,
    codigo_bodega text,
    codigo_cuarto_frio text,
    nombre_producto text,
    precio_total decimal,
    precio_unitario decimal,
    PRIMARY KEY (pedido_id, codigo_producto)
) WITH CLUSTERING ORDER BY (codigo_producto ASC);

CREATE TABLE pedidos_por_cliente (
    codigo_cliente uuid,
    pedido_id uuid,
    descuento_aplicado decimal,
    fecha_pedido timestamp,
    tipo_cliente text,
    total_pedido decimal,
    detalles list<frozen<tuple<uuid, text, int, decimal, decimal>>>,
    PRIMARY KEY (codigo_cliente, pedido_id)
) WITH CLUSTERING ORDER BY (pedido_id DESC);

CREATE TABLE productos (
    codigo uuid PRIMARY KEY,
    nombre text,
    fabricante text,
    marca text,
    precio_actual decimal,
    historico_precios list<frozen<tuple<decimal, timestamp>>>,
    imagen text,
    disponible BOOLEAN,
    
    codigo_bodega text,
    capacidad_bodega_cubica decimal,
    
    codigo_cuarto_frio text,
    capacidad_cuarto_frio decimal,
    temperatura_cuarto_frio decimal
);

CREATE TABLE carrito_por_cliente(
    codigo_cliente UUID,
    codigo_producto UUID,
    cantidad INT,
    nombre_producto TEXT,
    precio_unitario DECIMAL,
    subtotal DECIMAL,
    ordenado BOOLEAN,
    imagen TEXT,
    PRIMARY KEY(codigo_cliente, codigo_producto)
);

CREATE TABLE pedidos_por_cliente_fecha (
    codigo_cliente UUID,
    fecha DATE,    
    pedido_id UUID,
    nombre_cliente TEXT,
    total DECIMAL,
    tipo_cliente TEXT,
    descuento_aplicado DECIMAL,
    PRIMARY KEY (codigo_cliente, fecha, pedido_id)
) WITH CLUSTERING ORDER BY (fecha DESC, pedido_id DESC);



CREATE INDEX ON productos (nombre);
CREATE INDEX ON carrito_por_cliente (ordenado)
