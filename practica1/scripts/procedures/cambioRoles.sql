USE BD2;

-- Procedimiento para cambiar a rol de tutor y asignar tutor a curso
CREATE PROCEDURE PR2 
	@Email NVARCHAR(max),
	@CodCourse INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR2).', SYSDATETIME());
		BEGIN TRANSACTION;
	
		DECLARE @UsuarioId UNIQUEIDENTIFIER;
		DECLARE @EmailConfirmed BIT;
		SELECT @UsuarioId = Id, @EmailConfirmed = EmailConfirmed FROM [practica1].[Usuarios] WHERE Email = @Email;
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
		SELECT @NombreCurso = Name FROM [practica1].[Course] WHERE CodCourse = @CodCourse;
		IF @NombreCurso IS NULL
		BEGIN 
			-- Si no se encuentra curso, devolver un mensaje de error
	        RAISERROR('No se encontró curso con ese codigo.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		UPDATE [practica1].[UsuarioRole] SET IsLatestVersion = 0 WHERE [UsuarioRole].UserId = @UsuarioId;
		
		DECLARE @RoleId UNIQUEIDENTIFIER;
		SELECT @RoleId = Id FROM [practica1].[Roles] WHERE Roles.RoleName = 'Tutor';
		IF @RoleId IS NULL
		BEGIN
			-- Si no se encuentra rol de tutor, devolver un mensaje de error
	        RAISERROR('No se encontró rol de tutor.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END

		IF EXISTS (SELECT 1 FROM [practica1].[CourseTutor] WHERE TutorId = @UsuarioId AND CourseCodCourse = @CodCourse)
		BEGIN 
			-- Si el tutor ya esta asignado al curso, devolver un mensaje de error
	        RAISERROR('El tutor ya esta asignado al curso.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		

		IF NOT EXISTS (SELECT 1 FROM [practica1].[TutorProfile] WHERE UserId = @UsuarioId)
		BEGIN 
			INSERT INTO [practica1].[TutorProfile] (UserId, TutorCode) VALUES (@UsuarioId, NEWID());		
		END

		DECLARE @Message NVARCHAR(max);
		SET @Message = 'Has sido asignado al curso de ' + @NombreCurso;
		
		INSERT INTO [practica1].[UsuarioRole] (RoleId, UserId, IsLatestVersion) VALUES (@RoleId, @UsuarioId, 1);
		INSERT INTO [practica1].[CourseTutor] (TutorId, CourseCodCourse) VALUES (@UsuarioId, @CodCourse);
		INSERT INTO [practica1].[Notification] (UserId, Message, [Date]) VALUES (@UsuarioId, @Message, SYSDATETIME());
		
		COMMIT TRANSACTION;
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR2).', SYSDATETIME());
		PRINT('Tutor asignado exitosamente.');
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR2).', SYSDATETIME());
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

-- Usar procedimiento
EXEC PR2
	@Email = 'casaca@gmail.com',
	@CodCourse = 5045
;

-- Eliminar Procedimiento
IF OBJECT_ID('PR2', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR2;
END;


