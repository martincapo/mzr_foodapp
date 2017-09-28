DROP TABLE users_orders;
DROP TABLE food;
DROP TABLE orders;
DROP TABLE vendors;
DROP TABLE users;

CREATE TABLE users (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT,
  email        TEXT,
  phone_number TEXT,
  password     TEXT
);

CREATE TABLE vendors (
  id            BIGSERIAL  PRIMARY KEY,
  name          TEXT       NOT NULL,
  address       TEXT       NOT NULL,
  phone_number  TEXT       NOT NULL,
  password      TEXT
);

CREATE TABLE orders (
  id         BIGSERIAL      PRIMARY KEY,
  vendor_id   BIGINT        references vendors,
  user_id     BIGINT        references users,
  completed  boolean        NOT NULL
);

CREATE TABLE food (
  id            BIGSERIAL  PRIMARY KEY,
  name          TEXT       NOT NULL,
  price         DECIMAl    NOT NULL,
  vendor_id     BIGINT     NOT NULL,
  description   TEXT       NOT NULL
);

CREATE TABLE users_orders (
  id         BIGSERIAL     PRIMARY KEY,
  order_id    BIGINT       references orders,
  food_id     BIGINT       references food
);






