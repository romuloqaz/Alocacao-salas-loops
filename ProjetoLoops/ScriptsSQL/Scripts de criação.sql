create table servidor(
    matricula int,
    nome varchar(100) not null,
    senha varchar(20) not null,
    cargo varchar(40) not null,
	email varchar(100) not null,
    primary key(matricula)
);

create table local (
	id serial,
	nome varchar(50),
	tipo varchar(50),
    descricao varchar(200),
	primary key(id)
	);

create table reserva(
    id serial,
    servidor int,	
	local integer,
	dataReserva date,
    horarioInicio integer,
    horariofim integer,
    turno varchar(10),
	foreign key (servidor)references servidor(matricula),
    foreign key (local) references local(id)
	) 

