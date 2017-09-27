CREATE TABLE users (
  id          BIGSERIAL PRIMARY KEY,
  email       text,
  phoneNumber INT,
  password    varchar
);

CREATE TABLE vendors (
  id            BIGSERIAL  PRIMARY KEY,
  address       text       NOT NULL,
  phoneNumber   INT        NOT NULL,
  password      varchar    NOT NULL
);

CREATE TABLE orders (
  id         BIGSERIAL  PRIMARY KEY,
  vendorid   BIGSERIAL  NOT NULL,
  userid     BIGSERIAL  NOT NULL,
  foodid     BIGSERIAL  NOT NULL,
  completed  boolean    NOT NULL
);

CREATE TABLE food (
  id            BIGSERIAL  PRIMARY KEY,
  name          text       NOT NULL,
  price         DECIMAl    NOT NULL,
  vendorid      BIGSERIAL  NOT NULL,
  description   text       NOT NULL
);







