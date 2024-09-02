USE BD2;

-- Crear la funcion para listar las notificaciones de un usuario.
CREATE FUNCTION [practica1].[F3](@IdUsuario UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM [practica1].[Notification] n
	WHERE n.UserId = @IdUsuario
);

-- Ejecutar la funcion
SELECT * FROM [practica1].[F3]('09CD351A-FB0E-4F4D-AC85-AA9046BFFF5E');



-- Eliminar la funcion
IF OBJECT_ID('practica1.F3', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F3;
END

