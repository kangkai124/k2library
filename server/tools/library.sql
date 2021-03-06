create table books(
  id int not null auto_increment primary key,
  isbn varchar(20) not null,
  openId varchar(50) not null,
  title varchar(100) not null,
  image varchar(100),
  alt varchar(100) not null,
  publisher varchar(100) not null,
  summary varchar(1000) not null,
  price varchar(100),
  rating float,
  tags varchar(100),
  author varchar(100)
)


create table comments(
  id int auto_increment primary key,
  openId varchar(100) not null,
  bookId varchar(10) not null,
  comment VARCHAR(200) not null,
  phone VARCHAR(50),
  location VARCHAR(50)
)
