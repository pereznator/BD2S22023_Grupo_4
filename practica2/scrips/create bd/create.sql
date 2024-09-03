-- creacion de la bd
create  database practica2;

use practica2;

-- tabla paceintes
CREATE TABLE PACIENTE(
    idPaciente  INT PRIMARY KEY ,
    edad INT,
    genero VARCHAR(20)
);

-- tabla habitacion
CREATE TABLE HABITACION(
    idHabitacion  INT PRIMARY KEY ,
    habitacion VARCHAR(50)
);

-- log habitacion
CREATE TABLE LOG_HABITACION (
    id_log_habitacion INT NOT NULL AUTO_INCREMENT,
    timestampx VARCHAR(100),
    statusx VARCHAR(45),
    idHabitacion INT,
    PRIMARY KEY (id_log_habitacion),
    FOREIGN KEY (idHabitacion) REFERENCES HABITACION(idHabitacion)
);

-- log actividad
CREATE TABLE LOG_ACTIVIDAD(
    id_log_actividad  INT PRIMARY KEY ,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    idPaciente INT,
    idHabitacion INT,
    FOREIGN KEY (idPaciente) REFERENCES PACIENTE(idPaciente),
    FOREIGN KEY (idHabitacion) REFERENCES HABITACION(idHabitacion)
);