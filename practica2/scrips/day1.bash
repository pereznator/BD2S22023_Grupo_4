-- backup completo de la base de datos
docker exec -t mysql-db mysqldump -uroot -padmin practica2 > "C:\Users\Esaú Arenas\3D Objects\UNIVERSIDAD\VIII SEMESTRE\BASES 2\LABORATORIO/day1_backup_completo.sql"

-- backup incremental 
docker exec -t mysql-db mysqldump -uroot -padmin practica2 PACIENTE > "C:\Users\Esaú Arenas\3D Objects\UNIVERSIDAD\VIII SEMESTRE\BASES 2\LABORATORIO/day1_backup_incremental.sql"