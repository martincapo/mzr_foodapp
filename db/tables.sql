CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,
  email        text,
  phone_number text,
  password     text
);

CREATE TABLE vendors (
  id            integer    PRIMARY KEY,
  address       text       NOT NULL,
  phoneNumber   text       NOT NULL,
  password      text
);

CREATE TABLE orders (
  id         BIGSERIAL     PRIMARY KEY,
  vendorid   Bigint        references vendors,
  userid     Bigint        references users,
  completed  boolean       NOT NULL
);

CREATE TABLE food (
  id            BIGSERIAL  PRIMARY KEY,
  name          text       NOT NULL,
  price         DECIMAl    NOT NULL,
  vendorid      integer    NOT NULL,
  description   text       NOT NULL
);

CREATE TABLE users_orders (
  id         BIGSERIAL     PRIMARY KEY,
  orderid    Bigint        references orders,
  foodid     Bigint        references food
);






