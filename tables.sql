CREATE TABLE IF NOT EXISTS address(
    DistrictId  integer NOT NULL,
    Locality   varchar(255) NOT NULL,
    City   varchar(255) NOT NULL,
    State  varchar(255) NOT NULL,
    ZipCode  varchar(255) NOT NULL,
    CONSTRAINT PK_District PRIMARY KEY (DistrictId));



CREATE TABLE if NOT EXISTS voter_table (
    FirstName varchar(255) NOT NULL,
    MiddleName varchar(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    sex char(7) NOT NULL,
)
