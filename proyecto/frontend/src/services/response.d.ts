export declare interface Cliente{
  codigo: string,
  descuento: string,
  direccion: String,
  nombre: string,
  representantelegal: string,
  telefono: string,
  tipo: string
}

export declare interface Producto {
  codigo: string,
  capacidad_bodega_cubica: number,
  capacidad_cuarto_frio?: number,
  codigo_bodega: string,
  codigo_cuarto_frio?: string,
  disponible: boolean,
  fabricante: string,
  historico_precios: Array<{precio: number, fecha: string}>,
  imagen: string,
  marca: string,
  nombre: string,
  precio_actual: number,
  temperatura_cuarto_frio?: null
}

export declare interface ItemCarrito {
  codigo_cliente: string,
  codigo_producto: string,
  cantidad: number,
  imagen: string,
  nombre_producto: string,
  ordenado: boolean,
  precio_unitario: number,
  subtotal: number
}

export declare interface ItemPedido {
  codigo_producto: string,
  nombre_producto: string,
  imagen: string,
  codigo_bodega: string,
  codigo_cuarto_frio?: string,
  precio_unitario: number,
  cantidad: number,
  precio_total: number
}

export declare interface Pedido {
  codigo_cliente: string,
  pedido_id: string,
  descuento_aplicado: number,
  detalles: ItemPedido[],
  fecha_pedido: string,
  tipo_cliente: string,
  total_pedido: number
}
