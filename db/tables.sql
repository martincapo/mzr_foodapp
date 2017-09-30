DROP TABLE IF EXISTS orders_food CASCADE;
DROP TABLE IF EXISTS food CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT,
  email        TEXT,
  phone_number TEXT,
  password     TEXT
);

CREATE TABLE vendors (
  id          BIGSERIAL  PRIMARY KEY,
  name          TEXT       NOT NULL,
  address       TEXT       NOT NULL,
  phone_number  TEXT       NOT NULL,
  password      TEXT
);

CREATE TABLE orders (
  id         BIGSERIAL      PRIMARY KEY,
  vendor_id   BIGINT        references vendors,
  user_id     BIGINT        references users,
  est_mins    INTEGER        NOT NULL,
  completed   BOOLEAN        NOT NULL,
  order_date TIMESTAMP
);

CREATE TABLE food (
  id            BIGSERIAL  PRIMARY KEY,
  name          TEXT       NOT NULL,
  price         DECIMAl    NOT NULL,
  vendor_id     BIGINT     NOT NULL,
  description   TEXT       NOT NULL,
  food_img      TEXT
);

CREATE TABLE orders_food (
  id         BIGSERIAL     PRIMARY KEY,
  order_id    BIGINT       references orders,
  food_id     BIGINT       references food,
  qty        INTEGER       NOT NULL
);




