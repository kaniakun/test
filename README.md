create database test
для создания таблиц
create table customers
(
	id serial primary key,
	firstname varchar(20) not null,
	lastname varchar(20)not null,
	key integer
);
create table orders
(
id serial primary key,
title varchar(50) not null,
customerid integer references customers(id)
);
для nodejs нужно установить express,pg
для запуска node test.js
результат по адресу http://localhost:3000
