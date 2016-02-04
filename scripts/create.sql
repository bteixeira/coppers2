## sudo -u postgres createuser -P coppers2_admin
## sudo -u postgres createdb -O coppers2_admin coppers2
## psql -h localhost -U coppers2_admin -d coppers2


create table Users (id serial);
alter table Users add column email text;


create table Spendings (id serial);
alter table Spendings add column id_user integer;
alter table Spendings add column amount money;
alter table Spendings add column "date" timestamp with time zone;
alter table Spendings add column description text;


create table Tags (id serial);
alter table Tags add column name varchar(255);


create table Spendings_Tags (id_spending integer, id_tag integer);


#####

insert into Users (email) values ('tester@coppers.cop');