CREATE TABLE IF NOT EXISTS address(
    DistrictId integer NOT NULL,
    Locality varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    State varchar(255) NOT NULL,
    ZipCode varchar(255) NOT NULL,
    CONSTRAINT PK_District PRIMARY KEY (DistrictId)
);
CREATE TABLE if NOT EXISTS voter_table (
    VoterId INTEGER NOT NULL,
    FirstName varchar(255) NOT NULL,
    MiddleName varchar(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    sex char(7) NOT NULL,
    Birthday DATE NOT NULL,
    Age integer NOT NULL,
    Phone NUMERIC(10) NOT NULL,
    Email varchar(255) NOT NULL,
    DistrictId INTEGER NOT NULL,
    CONSTRAINT PK_VOTER PRIMARY KEY (VoterId),
    CONSTRAINT FK_VOTER FOREIGN KEY (DistrictId) REFERENCES address(DistrictId) PartyID INTEGER NOT NULL auto_increment
);
CREATE TABLE IF NOT EXISTS Party_table(
    PartyName varchar(255) NOT NULL UNIQUE,
    Symbol varchar(255) NOT NULL UNIQUE,
    Partyleader VARCHAR(255) NOT NULL,
    LeaderId INTEGER NOT NULL UNIQUE,
    CONSTRAINT PK_Party PRIMARY KEY (PartyID) CONSTRAINT FK_VOTER FOREIGN KEY (LeaderId) REFERENCES voter_table(VoterId);
);
CREATE TABLE IF NOT EXISTS Candidate_table(
    CandidateId INTEGER NOT NULL auto_increment,
    nationalId INTEGER NOT NULL UNIQUE,
    CandidateName VARCHAR(255) NOT NULL,
    PartyID INT NOT NULL,
    DistrictId INTEGER NOT NULL,
    CONSTRAINT PK_CANDIDATE PRIMARY KEY (CandidateId),
    CONSTRAINT FK_VOTER FOREIGN KEY (PartyID) REFERENCES voter_table(nationalId),
    CONSTRAINT FK_DISTRICT_2 FOREIGN KEY (DistrictId) REFERENCES Party_table(PartyID) CONSTRAINT FK_PARTY FOREIGN KEY (PartyID) REFERENCES Party_table(PartyID)
);
CREATE TABLE IF NOT EXISTS user_table(
    VoterId VARCHAR(10) NOT NULL,
    userId CHAR(15) NOT NULL UNIQUE,
    _password VARCHAR(50) NOT NULL,
    CONSTRAINT PK_USER PRIMARY KEY (userId),
    CONSTRAINT FK_VOTER_2 FOREIGN KEY(VoterId) REFERENCES voter_table(VoterId)
);
CREATE TABLE if not exists vote_table(
    VoteId int not null auto_increment,
    voting char(15) not null unique,
    PartyId int not null,
    CandidateId int not null,
    DistrictId int not null,
    CONSTRAINT PK_VOTE PRIMARY KEY (VoteID),
    CONSTRAINT FK_VOTERID FOREIGN KEY (voting) references user_table(voting),
    CONSTRAINT FK_CANDIDATEID FOREIGN KEY (CandidateId) references candidate_table(CandidateId),
    CONSTRAINT FK_DISTRICT_4 FOREIGN KEY (DistrictId) references address(DistrictId),
    CONSTRAINT FK_PARTY_2 FOREIGN KEY (PartyId) references party_table(PartyId)
);
CREATE TABLE IF NOT EXISTS result(
    ResultId int NOT NULL auto_increment,
    CandidateId INT NOT NULL,
    PartyID INT NOT NULL,
    DistrictId INT NOT NULL,
    vote_Count INT NOT NULL,
    CONSTRAINT PK_RESULT PRIMARY KEY (ResultId),
    CONSTRAINT FK_CANDIDATE_2 FOREIGN KEY (CandidateId) REFERENCES Candidate_table(CandidateId),
    CONSTRAINT FK_DISTRICT_5 FOREIGN KEY (DistrictId) REFERENCES Party_table(PartyID),
);
DELIMITER / / CREATE TRIGGER Vote_counting
after
insert on vote_table FOR EACH ROW BEGIN if not exists (
        select CandidateId
        from result
        where result.CandidateId = new.CandidateId
    ) then
insert into result(CandidateId, PartyId, DistrictId, Vote_Count)
values(new.CandidateId, new.PartyId, new.DistrictId, 1);
else
update result
set result.Vote_Count = result.Vote_Count + 1
where result.CandidateId = new.CandidateId;
end if;
END / / DELIMITER;
