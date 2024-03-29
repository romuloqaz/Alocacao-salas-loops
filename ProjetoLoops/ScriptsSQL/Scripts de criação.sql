create table servidor(
    matricula int,
    nome varchar(100) not null,
    senha varchar(20) not null,
    cargo varchar(40) not null,
	email varchar(100) not null,
    primary key(matricula)
);

create table lugar (
	id serial,
	nome varchar(50),
	tipo varchar(50),
    descricao varchar(200),
	primary key(nome)
	);

create table reserva(
    servidor int,	
    nome varchar(50),
    dataReserva date,
    horarioInicio integer,
    horariofim integer,
    turno varchar(10),
    foreign key (servidor)references servidor(matricula),
    foreign key (nome) references lugar(nome)
	) 
