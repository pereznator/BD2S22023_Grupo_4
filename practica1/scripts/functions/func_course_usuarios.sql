USE BD2;

-- Crear la funcion para listar los estudiantes de un curso en especifico.
CREATE FUNCTION [practica1].[F1](@CodCourse INT)
RETURNS TABLE
AS
RETURN
(
	SELECT u.*
	FROM [practica1].[CourseAssignment] ca
	JOIN [practica1].[Usuarios] u ON u.Id = ca.StudentId
	WHERE CourseCodCourse = @CodCourse
);

-- Ejecutar la funcion
SELECT * FROM [practica1].[F1](283);



-- Eliminar la funcion
IF OBJECT_ID('practica1.F1', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F1;
END