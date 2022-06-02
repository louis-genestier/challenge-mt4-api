CREATE DATABASE IF NOT EXISTS challenge;

create user IF NOT EXISTS 'dev'@'%.%.%.%' identified by 'password';
grant select, update, insert, delete on challenge.* to 'dev'@'%.%.%.%';
flush privileges;