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
SELECT * FROM [practica1].[F3]('23FC39C4-1A67-488E-8C8E-4750DFA03BC7');



-- Eliminar la funcion
IF OBJECT_ID('practica1.F3', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F3;
END

