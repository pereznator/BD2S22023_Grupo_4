

--USE master;
--
--DECLARE @dbname NVARCHAR(128) = 'BD2';
--
--DECLARE @sql NVARCHAR(MAX) = N'';
--
--SELECT @sql += N'KILL ' + CAST(session_id AS NVARCHAR(5)) + N';'
--FROM sys.dm_exec_sessions
--WHERE database_id = DB_ID(@dbname);
--
--EXEC sp_executesql @sql;
--
--DROP DATABASE BD2;



USE BD2;

--- CREAR TRIGGERS

CREATE TRIGGER [practica1].[courseAssignmentTrigger]
ON [practica1].[CourseAssignment]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de CourseAssignment.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de CourseAssignment.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de CourseAssignment.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;

CREATE TRIGGER [practica1].[courseTrigger]
ON [practica1].[Course]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de Course.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de Course.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de Course.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;


CREATE TRIGGER [practica1].[courseTutorTrigger]
ON [practica1].[CourseTutor]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de CourseTutor.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de CourseTutor.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de CourseTutor.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;

CREATE TRIGGER [practica1].[notificationTrigger]
ON [practica1].[Notification]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de Notification.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de Notification.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de Notification.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;


CREATE TRIGGER [practica1].[profileStudentTrigger]
ON [practica1].[ProfileStudent]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de ProfileStudent.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de ProfileStudent.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de ProfileStudent.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;



CREATE TRIGGER [practica1].[rolesTrigger]
ON [practica1].[Roles]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de Roles.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de Roles.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de Roles.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;


CREATE TRIGGER [practica1].[tfaTrigger]
ON [practica1].[TFA]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de TFA.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de TFA.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de TFA.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;


CREATE TRIGGER [practica1].[tutorProfileTrigger]
ON [practica1].[TutorProfile]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de TutorProfile.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de TutorProfile.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de TutorProfile.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;

CREATE TRIGGER [practica1].[usuarioRoleTrigger]
ON [practica1].[UsuarioRole]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de UsuarioRole.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de UsuarioRole.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de UsuarioRole.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;




CREATE TRIGGER [practica1].[usuarioTrigger]
ON [practica1].[Usuarios]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Description NVARCHAR(MAX);

    IF EXISTS (SELECT 1 FROM inserted) AND EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[UPDATE] En la tabla de Usuarios.';
    END
    ELSE IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        SET @Description = '[INSERT] En la tabla de Usuarios.';
    END
    ELSE IF EXISTS (SELECT 1 FROM deleted)
    BEGIN
        SET @Description = '[DELETE] En la tabla de Usuarios.';
    END

    INSERT INTO HistoryLog (Description, [Date])
    VALUES (@Description, SYSDATETIME());
END;

--- CREAR PROCEDIMIENTOS

CREATE PROCEDURE PR3
	@Email NVARCHAR(max),
	@CodCourse INT
AS
BEGIN
	BEGIN TRY
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Creada (PR3).', SYSDATETIME());
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
		INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Commit (PR3).', SYSDATETIME());
		PRINT('Curso asignado exitosamente.');
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
			INSERT INTO [practica1].[HistoryLog] (Description, [Date]) VALUES ('[TRANSACTION] Rollback (PR3).', SYSDATETIME());
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
	        PRINT 'NO HAY CURSO';
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
		PRINT 'Mensaje de error: ' + ERROR_MESSAGE();
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
END;

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
END;


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
END;


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
END;


--- CREAR FUNCIONES


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


CREATE FUNCTION [practica1].[F4]()
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM [practica1].[HistoryLog]
);



CREATE FUNCTION [practica1].[F3](@IdUsuario UNIQUEIDENTIFIER)
RETURNS TABLE
AS
RETURN
(
	SELECT *
	FROM [practica1].[Notification] n
	WHERE n.UserId = @IdUsuario
);


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



--- CREATE CONSTRAINTS


ALTER TABLE [practica1].[Course] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Nombre
		CHECK ([Name] NOT LIKE '%[^A-Za-z ]%');

ALTER TABLE [practica1].[Usuarios] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Firstname
		CHECK ([Firstname] NOT LIKE '%[^A-Za-z ]%');
	
ALTER TABLE [practica1].[Usuarios] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Lastname
		CHECK ([Lastname] NOT LIKE '%[^A-Za-z ]%');
