USE BD2;


CREATE PROCEDURE PR5 
	@CodCourse INT,
	@Name NVARCHAR(max),
	@CreditsRequired INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR5).', SYSDATETIME());
		BEGIN TRANSACTION;
	
		IF PATINDEX('%[^a-zA-Z ]%', @Name) > 0
		BEGIN
			-- Si el nombre del curso no lleva el formato correcto, devolver un mensaje de error
	        RAISERROR('El nombre del curso es invalido, solo puede llevar letras y espacios.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
	
		IF EXISTS (SELECT 1 FROM [practica1].[Course] WHERE CodCourse = @CodCourse)
		BEGIN 
			-- Si el curso ya existe, devolver un mensaje de error
	        RAISERROR('Ya existe un curso con el codigo proporcionado.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		INSERT INTO [practica1].[Course] (CodCourse, Name, CreditsRequired) VALUES (@CodCourse, @Name, @CreditsRequired);
		
		COMMIT TRANSACTION;
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR5).', SYSDATETIME());
		PRINT('Curso creado exitosamente.');
	
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR5).', SYSDATETIME());
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

EXEC PR5
	@CodCourse = 420,
	@Name = 'Organizacion Computacional',
	@CreditsRequired = 70
;


IF OBJECT_ID('PR5', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR5;
END;
	