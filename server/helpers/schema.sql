CREATE TABLE accounts (
  id VARCHAR(12) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(32) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logged TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY email (`email`),
  KEY created (created),
  KEY logged (logged)
);

CREATE TABLE metadata (
  type VARCHAR(12) NOT NULL,
  id VARCHAR(12) NOT NULL,
  key VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (`type`, `id`, `key`)
);

CREATE TABLE uploads (
  type VARCHAR(12) NOT NULL,
  id VARCHAR(64) NOT NULL,
  metadata TEXT NOT NULL,
  PRIMARY KEY (`type`, `id`)
);

INSERT INTO accounts (id, email, password, name) VALUES
('1', 'fabien@bonustrack.co', 'password22', 'Fabien');
