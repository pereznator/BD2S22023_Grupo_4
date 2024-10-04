CREATE TABLE IF NOT EXISTS proyecto_bases2.productos (
    codigo_producto uuid PRIMARY KEY,
    capacidad_bodega_cubica decimal,
    capacidad_cuarto_frio decimal,
    codigo_bodega uuid,
    codigo_cuarto_frio uuid,
    nombre_bodega text,
    nombre_producto text,
    precio_actual decimal,
    temperatura_cuarto_frio decimal,
    tiene_cuarto_frio boolean,
    historico_precios list<frozen<tuple<decimal, timestamp>>>
) WITH ID = b21e3db0-8075-11ef-b29d-d191b503a1ef
    AND additional_write_policy = '99p'
    AND allow_auto_snapshot = true
    AND bloom_filter_fp_chance = 0.01
    AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
    AND cdc = false
    AND comment = ''
    AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
    AND compression = {'chunk_length_in_kb': '16', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
    AND memtable = 'default'
    AND crc_check_chance = 1.0
    AND default_time_to_live = 0
    AND extensions = {}
    AND gc_grace_seconds = 864000
    AND incremental_backups = true
    AND max_index_interval = 2048
    AND memtable_flush_period_in_ms = 0
    AND min_index_interval = 128
    AND read_repair = 'BLOCKING'
    AND speculative_retry = '99p';
