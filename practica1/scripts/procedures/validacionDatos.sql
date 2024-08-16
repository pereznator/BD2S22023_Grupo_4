USE BD2;

-- Procedimiento para validar datos.
CREATE PROCEDURE PR6
AS
BEGIN
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR6).', SYSDATETIME());
		BEGIN TRANSACTION;
		
		 -- Variable para manejar la longitud de las cadenas
	    DECLARE @i INT, @Len INT;
	    -- Variables para almacenar el valor limpio de las columnas
	    DECLARE @NuevoNombre NVARCHAR(MAX), @NuevoApellido NVARCHAR(MAX);
	    
	    -- Cursor para recorrer cada registro en la tabla Usuarios
	    DECLARE cursorUsuarios CURSOR FOR
	    SELECT Id, Firstname, Lastname
	    FROM [practica1].[Usuarios];
	
	    DECLARE @UsuarioId UNIQUEIDENTIFIER, @Nombre NVARCHAR(MAX), @Apellido NVARCHAR(MAX);
	
	    OPEN cursorUsuarios;
	    FETCH NEXT FROM cursorUsuarios INTO @UsuarioId, @Nombre, @Apellido;
	
	    WHILE @@FETCH_STATUS = 0
	    BEGIN
	        -- Inicializar las variables para almacenar los valores limpios
	        SET @NuevoNombre = '';
	        SET @NuevoApellido = '';
	
	        -- Limpiar el campo Nombre
	        SET @Len = LEN(@Nombre);
	        SET @i = 1;
	
	        WHILE @i <= @Len
	        BEGIN
	            IF SUBSTRING(@Nombre, @i, 1) LIKE '[a-zA-Z]'
	            BEGIN
	                SET @NuevoNombre = @NuevoNombre + SUBSTRING(@Nombre, @i, 1);
	            END
	            SET @i = @i + 1;
	        END
	
	        -- Limpiar el campo Apellido
	        SET @Len = LEN(@Apellido);
	        SET @i = 1;
	
	        WHILE @i <= @Len
	        BEGIN
	            IF SUBSTRING(@Apellido, @i, 1) LIKE '[a-zA-Z ]'
	            BEGIN
	                SET @NuevoApellido = @NuevoApellido + SUBSTRING(@Apellido, @i, 1);
	            END
	            SET @i = @i + 1;
	        END
	
	        -- Actualizar la tabla con los valores limpios
	        UPDATE practica1.Usuarios SET Firstname = @NuevoNombre, Lastname = @NuevoApellido WHERE id = @UsuarioId;
	
	        FETCH NEXT FROM cursorUsuarios INTO @UsuarioId, @Nombre, @Apellido;
	    END
	
	    CLOSE cursorUsuarios;
	    DEALLOCATE cursorUsuarios;
	   
	   	DECLARE @idx INT, @CLen INT;
	   	DECLARE @NuevoNombreCurso NVARCHAR(MAX), @NuevoCreditos INT;
	   	DECLARE cursorCurso CURSOR FOR
	   	SELECT CodCourse, Name, CreditsRequired FROM [practica1].[Course];
	   	
	   	DECLARE @CodCourseAux INT, @NameAux NVARCHAR(MAX), @CreditosAux INT;
	   	
	   	OPEN cursorCurso;
	   	FETCH NEXT FROM cursorCurso INTO @CodCourseAux, @NameAux, @CreditosAux;
	   	WHILE @@FETCH_STATUS = 0
	   	BEGIN
	   		SET @NuevoNombreCurso = '';
	   		SET @NuevoCreditos = 0;
	   	
	   		SET @CLen = LEN(@NameAux);
	   		SET @idx = 1;
	   		
	   		WHILE @idx <= @CLen
	   		BEGIN
	   			IF SUBSTRING(@NameAux, @idx, 1) LIKE '[a-zA-Z ]'
	            BEGIN
	                SET @NuevoNombreCurso = @NuevoNombreCurso + SUBSTRING(@NameAux, @idx, 1);
	            END
	            SET @idx = @idx + 1;
	   		END
	   		
	   		UPDATE [practica1].[Course] SET Name = @NuevoNombreCurso WHERE CodCourse = @CodCourseAux;
	   		FETCH NEXT FROM cursorCurso INTO @CodCourseAux, @NameAux, @CreditosAux;
	   		
	   	END
	   	
	   	CLOSE cursorCurso;
	    DEALLOCATE cursorCurso;
	   	
		
		COMMIT TRANSACTION;
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR6).', SYSDATETIME());
	    -- Mensaje de éxito opcional
	    PRINT('Los nombres y apellidos han sido validados y limpiados exitosamente.');
	
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR6).', SYSDATETIME());
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

-- Ejecutar Procedimiento
EXEC PR6;


-- Eliminar Procedimiento
IF OBJECT_ID('PR6', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE PR6;
END;


