USE BD2;
-- Procedimiento para asignar estudiante a curso
CREATE PROCEDURE PR3
	@Email NVARCHAR(max),
	@CodCourse INT
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;
	
		DECLARE @UsuarioId UNIQUEIDENTIFIER;
		DECLARE @EmailConfirmed BIT;
		DECLARE @Credits INT;
		SELECT @UsuarioId = s.Id, @EmailConfirmed = s.EmailConfirmed, @Credits = ps.Credits FROM [practica1].[Usuarios] s JOIN [practica1].[ProfileStudent] ps ON ps.UserId = s.Id WHERE Email = @Email;
		IF @UsuarioId IS NULL
		BEGIN
			-- Si no se encuentra usuario, devolver un mensaje de error
	        RAISERROR('No se encontró ningún usuario con ese correo electrónico.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		IF @EmailConfirmed = 0
		BEGIN
			-- Si no el usuario no tiene cuenta activa, devolver un mensaje de error
	        RAISERROR('El usuario no tiene su cuenta activa.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		DECLARE @NombreCurso NVARCHAR(MAX);
		DECLARE @CreditosRequeridos INT;
		SELECT @NombreCurso = Name, @CreditosRequeridos = CreditsRequired FROM [practica1].[Course] WHERE CodCourse = @CodCourse;
		IF @NombreCurso IS NULL
		BEGIN 
			-- Si no se encuentra curso, devolver un mensaje de error
	        RAISERROR('No se encontró curso con ese codigo.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		IF EXISTS (SELECT 1 FROM [practica1].[CourseAssignment] ca WHERE ca.StudentId = @UsuarioId AND ca.CourseCodCourse = @CodCourse)
		BEGIN 
			-- Si ya esta asignado al curso, devolver un mensaje de error
	        RAISERROR('El usuario ya esta asignado a este curso.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		
		IF @Credits < @CreditosRequeridos
		BEGIN
			-- Si no llega a los creditos requeridos, devolver un mensaje de error
			DECLARE @CErrorMessage NVARCHAR(MAX);
			SET @CErrorMessage = 'No se puede asignar. ' + @NombreCurso + ' Necesita ' + CAST(@CreditosRequeridos AS NVARCHAR(MAX))+ ' creditos como minimo y el usuario tiene ' + CAST(@Credits AS NVARCHAR(MAX)) + '.' 
	        RAISERROR(@CErrorMessage, 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		INSERT INTO [practica1].[CourseAssignment] (StudentId, CourseCodCourse) VALUES (@UsuarioId, @CodCourse);
		DECLARE @Message NVARCHAR(MAX);
		SET @Message = 'Has sido asignado al curso ' + @NombreCurso + '.';
		INSERT INTO [practica1].[Notification] (UserId, Message, [Date]) VALUES (@UsuarioId, @Message, SYSDATETIME());		
		COMMIT TRANSACTION;
		PRINT('Curso asignado exitosamente.');
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END
		
		-- Devolver el error capturado
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;

        SELECT 
            @ErrorMessage = ERROR_MESSAGE(),
            @ErrorSeverity = ERROR_SEVERITY(),
            @ErrorState = ERROR_STATE();

        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
	END CATCH
END

EXEC PR3
	@Email = 'email@gmail.com',
	@CodCourse = 970
;

-- Eliminar Procedimiento
IF OBJECT_ID('PR3', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR3;
END;


