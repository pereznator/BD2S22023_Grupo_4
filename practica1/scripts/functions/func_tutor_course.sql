USE BD2;

-- Crear la funcion para listar los estudiantes de un curso en especifico.
CREATE FUNCTION [practica1].[F2](@IdTutorProfile INT)
RETURNS TABLE
AS
RETURN
(
	SELECT c.*
	FROM [practica1].[Course] c
	JOIN [practica1].[CourseTutor] ct ON ct.CourseCodCourse = c.CodCourse 
	JOIN [practica1].[Usuarios] u ON u.Id = ct.TutorId 
	JOIN [practica1].[TutorProfile] tp ON tp.UserId = u.Id 
	WHERE tp.Id = @IdTutorProfile
);

-- Ejecutar la funcion
SELECT * FROM [practica1].[F2](1);



-- Eliminar la funcion
IF OBJECT_ID('practica1.F2', 'IF') IS NOT NULL
BEGIN
    DROP FUNCTION practica1.F2;
END

