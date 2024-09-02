USE BD2;
-- Crear la funcion para listar los estudiantes de un curso en especifico.
CREATE FUNCTION [practica1].[F5](@UsuarioId UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN
(
  SELECT
  u.Firstname,
  u.Lastname ,
  u.Email ,
  u.DateOfBirth ,
  ps.Credits ,
  r.RoleName
  FROM [practica1].[Usuarios] u
  JOIN [practica1].[UsuarioRole] ur ON ur.UserId = u.Id
  JOIN [practica1].[Roles] r ON r.Id = ur.RoleId
  JOIN [practica1].[ProfileStudent] ps ON ps.UserId = u.Id
  WHERE u.Id = @UsuarioId AND r.RoleName = 'Student'
);
-- Ejecutar la funcion
SELECT * FROM [practica1].[F5]('09CD351A-FB0E-4F4D-AC85-AA9046BFFF5E');
-- Eliminar la funcion
IF OBJECT_ID('practica1.F5', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F5;
END
  SELECT *
  FROM [practica1].[Usuarios] u
  JOIN [practica1].[UsuarioRole] ur ON ur.UserId = u.Id
  JOIN [practica1].[Roles] r ON r.Id = ur.RoleId
  WHERE u.Id = '23FC39C4-1A67-488E-8C8E-4750DFA03BC7'