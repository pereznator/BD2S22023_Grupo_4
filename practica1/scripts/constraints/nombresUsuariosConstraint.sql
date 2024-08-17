USE BD2;

ALTER TABLE [practica1].[Usuarios] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Firstname
		CHECK ([Firstname] NOT LIKE '%[^A-Za-z ]%');
	
ALTER TABLE [practica1].[Usuarios] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Lastname
		CHECK ([Lastname] NOT LIKE '%[^A-Za-z ]%');
		
	
	
INSERT INTO [practica1].[Usuarios] (Id, Firstname, Lastname, Email, DateOfBirth, Password, LastChanges, EmailConfirmed)
VALUES (NEWID(), 'Jorge 1', 'Perez 2', 'aasdfasdf@gmail.com', '1999-01-01', '123', '2024-01-01', 1);


ALTER TABLE [practica1].[Usuarios] DROP CONSTRAINT CHK_Sololetras_Firstname;

ALTER TABLE [practica1].[Usuarios] DROP CONSTRAINT CHK_Sololetras_Lastname;