CREATE TABLE users (
  id VARCHAR(12) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(128) NOT NULL,
  meta JSON NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logged TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY email (`email`),
  KEY created (created),
  KEY logged (logged)
);

CREATE TABLE users_uploads (
  user_id VARCHAR(64) NOT NULL,
  ipfs_hash VARCHAR(20) NOT NULL,
  meta JSON NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `ipfs_hash`)
);

CREATE TABLE settings (
  `key` VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
);

INSERT INTO users (id, email, password, meta) VALUES ('1', 'fabien@bonustrack.co', 'password22', '{"name":"Fabien","avatar":"QmdR1QWmDxYTwoDo2hp9N5iGEMHKxPH2LyhE4ACkTndn84"}');
