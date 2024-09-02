USE BD2;

--Declaracion de Procedimiento
CREATE PROCEDURE PR1
    @Firstname NVARCHAR(max),
    @Lastname NVARCHAR(max),
    @Email NVARCHAR(max),
    @DateOfBirth datetime2(7),
    @Password NVARCHAR(max),
    @Credits INT
    
AS
BEGIN
	
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR1).', SYSDATETIME());
		BEGIN TRANSACTION;
		DECLARE @UsuarioId UNIQUEIDENTIFIER;
		
		-- Verificar si ya existe un usuario con el mismo correo electrónico
	    IF EXISTS (SELECT 1 FROM [practica1].[Usuarios] WHERE Email = @Email)
	    BEGIN
	        -- Si el usuario existe, devolver un mensaje de error
	        RAISERROR('Ya existe un usuario con el correo electrónico proporcionado.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
	    END
		
	    INSERT INTO [practica1].[Usuarios] (
	    	Id,
	    	Firstname,
	    	Lastname,
	    	Email,
	    	DateOfBirth,
	    	Password,
	    	LastChanges,
	    	EmailConfirmed
	    )
	    VALUES (
	    	NEWID(),
	    	@Firstname,
	    	@Lastname,
	    	@Email,
	    	@DateOfBirth,
	    	@Password,
	    	SYSDATETIME(),
	    	1
	   	);
	  
		SET @UsuarioId = (SELECT id FROM [practica1].[Usuarios] WHERE Email = @Email);
	 
	 	DECLARE @RolId UNIQUEIDENTIFIER;
		SELECT @RolId = id FROM [practica1].[Roles] WHERE RoleName = 'Student';
		
		INSERT INTO [practica1].[UsuarioRole] (RoleId, UserId, IsLatestVersion) VALUES (@RolId, @UsuarioId, 1);
	
		INSERT INTO [practica1].[ProfileStudent] (UserId, Credits) VALUES (@UsuarioId, @Credits);
	
		INSERT INTO [practica1].[Notification] (UserId, Message, [Date]) VALUES (@UsuarioId, 'Estas registrado en el sistema de la USAC!!', SYSDATETIME());
	
		COMMIT TRANSACTION;
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR1).', SYSDATETIME());
	
	 	PRINT('Usuario creado exitosamente!');
	 
	END TRY
	BEGIN CATCH
	
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR1).', SYSDATETIME());
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
END;


-- Usar Procedimiento
EXEC PR1
	@Firstname = 'Javier',
	@Lastname = 'Hernandez',
	@Email = 'javi.her@gmail.com',
	@DateOfBirth = '1996-06-07',
	@Password = 'Ca$aca2000',
	@Credits = 5
;

-- Eliminar Procedimiento
IF OBJECT_ID('PR1', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR1;
END;

