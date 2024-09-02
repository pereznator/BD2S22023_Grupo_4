USE BD2;

CREATE PROCEDURE PR4
	@RoleName NVARCHAR(MAX)
AS
BEGIN
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR4).', SYSDATETIME());
		BEGIN TRANSACTION;
		IF EXISTS (SELECT 1 FROM [practica1].[Roles] r WHERE r.RoleName = @RoleName)
		BEGIN 
			-- Si no se encuentra usuario, devolver un mensaje de error
	        RAISERROR('Ya existe un rol con ese nombre.', 16, 1);
	       	ROLLBACK TRANSACTION;
	        RETURN; -- Terminar la ejecución del procedimiento
		END
		
		INSERT INTO [practica1].[Roles] (Id, RoleName) VALUES (NEWID(), @RoleName);
		COMMIT TRANSACTION;
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR4).', SYSDATETIME());
		PRINT('Role creado exitosamente.');
		
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR4).', SYSDATETIME());
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


EXEC PR4
	@RoleName = 'Director'
;


IF OBJECT_ID('PR4', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR4;
END;

