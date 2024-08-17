USE BD2;

ALTER TABLE [practica1].[Course] 
	WITH NOCHECK
	ADD CONSTRAINT CHK_Sololetras_Nombre
		CHECK ([Name] NOT LIKE '%[^A-Za-z ]%');
		
	
	
INSERT INTO [practica1].[Course] (CodCourse, Name, CreditsRequired) VALUES (2, 'HOLA MUNDO 12', 2);


ALTER TABLE [practica1].[Course] DROP CONSTRAINT CHK_Sololetras_Nombre;