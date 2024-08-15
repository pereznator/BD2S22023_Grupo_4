USE BD2;

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


IF OBJECT_ID('practica1.courseTrigger', 'TR') IS NOT NULL
BEGIN
    DROP TRIGGER practica1.courseTrigger;
END
