USE BD2;

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


IF OBJECT_ID('practica1.profileStudentTrigger', 'TR') IS NOT NULL
BEGIN
    DROP TRIGGER practica1.profileStudentTrigger;
END
