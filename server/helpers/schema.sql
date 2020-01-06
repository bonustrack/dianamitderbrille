CREATE TABLE accounts (
  id VARCHAR(12) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(128) NOT NULL,
  name VARCHAR(32) NOT NULL,
  is_admin INT DEFAULT 0,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logged TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY email (`email`),
  KEY created (created),
  KEY logged (logged)
);

INSERT INTO accounts (id, email, password, name, is_admin) VALUES
('1', 'fabien@bonustrack.co', 'password22', 'Fabien', '1');
