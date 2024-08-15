USE BD2;

-- Crear la funcion para listar los estudiantes de un curso en especifico.
CREATE FUNCTION [practica1].[F2](@UsuarioId UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN
(
	SELECT 
	FROM [practica1].[Usuarios]
);

-- Ejecutar la funcion
SELECT * FROM [practica1].[F2](970);



-- Eliminar la funcion
IF OBJECT_ID('practica1.F2', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F2;
END




	SELECT *
	FROM [practica1].[Usuarios] u
	JOIN [practica1].[UsuarioRole] ur ON ur.UserId = u.Id 
	JOIN [practica1].[Roles] r ON r.Id = ur.RoleId 
	WHERE u.Id = '23FC39C4-1A67-488E-8C8E-4750DFA03BC7'