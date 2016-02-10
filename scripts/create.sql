-- sudo -u postgres createuser -P coppers2_admin
-- sudo -u postgres createdb -O coppers2_admin coppers2
-- psql -h localhost -U coppers2_admin -d coppers2

CREATE TABLE
IF NOT EXISTS
Users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE
IF NOT EXISTS
Spendings (
    id SERIAL PRIMARY KEY,
    id_user INTEGER REFERENCES Users NOT NULL,
    amount MONEY,
    "date" TIMESTAMP WITH TIME ZONE,
    description TEXT
);

CREATE TABLE
IF NOT EXISTS
Spendings_Tags (
    id_spending INTEGER REFERENCES Spendings NOT NULL,
    tag VARCHAR(255) NOT NULL
);

INSERT INTO Users (email)
VALUES ('tester@coppers.cop');
