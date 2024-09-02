USE BD2;

-- Crear la funcion para listar los registros de la tabla history log.
CREATE FUNCTION [practica1].[F4]()
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM [practica1].[HistoryLog]
);

-- Ejecutar la funcion
SELECT * FROM [practica1].[F4]();



-- Eliminar la funcion
IF OBJECT_ID('practica1.F4', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F4;
END

