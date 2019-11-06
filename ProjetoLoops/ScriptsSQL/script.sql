create table Servidor(
    matricula varchar(20) primary key,
    nome varchar(100) not null,
    senha varchar(20) not null,
    cargo varchar(40) not null
)

create table Laboratorio (
	id serial primary key,
	bloco varchar(15),
	nome varchar(50),
	status varchar(50),
	matricula varchar(20),
	foreign key (matricula) references Servidor(matricula)
	);

create table sala (
	id serial primary key,
	bloco varchar(15),
	nome varchar(50),
	status varchar(50),
	matricula varchar(20),
	foreign key (matricula)references Servidor(matricula)
	)    