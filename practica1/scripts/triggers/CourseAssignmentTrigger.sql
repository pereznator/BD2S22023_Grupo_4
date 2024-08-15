USE BD2;

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


IF OBJECT_ID('practica1.courseAssignmentTrigger', 'TR') IS NOT NULL
BEGIN
    DROP TRIGGER practica1.courseAssignmentTrigger;
END
