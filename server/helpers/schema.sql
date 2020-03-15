CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(24) NOT NULL,
  username VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(128) NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  logged DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY username (`username`),
  UNIQUE KEY email (`email`),
  KEY created (created),
  KEY logged (logged)
);

CREATE TABLE IF NOT EXISTS uploads (
  user_id VARCHAR(24) NOT NULL,
  ipfs_hash VARCHAR(64) NOT NULL,
  mimetype TEXT NOT NULL,
  size TEXT NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `ipfs_hash`)
);

CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
);

CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(24) NOT NULL,
  user_id VARCHAR(24) NOT NULL,
  title VARCHAR(64) NOT NULL,
  body TEXT NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS likes (
  user_id VARCHAR(24) NOT NULL,
  post_id VARCHAR(64) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `post_id`)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id VARCHAR(24) NOT NULL,
  subscription VARCHAR(24) NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expired DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `subscription`)
);

CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(64) NOT NULL,
  sender VARCHAR(24) NOT NULL,
  receiver VARCHAR(24) NOT NULL,
  amount FLOAT(12,6) NOT NULL,
  memo VARCHAR(64) NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(24) NOT NULL,
  sender VARCHAR(24) NOT NULL,
  receiver VARCHAR(24) NOT NULL,
  body TEXT NOT NULL,
  meta JSON NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO users (id, username, email, password, meta) VALUES ('1', 'bonustrack', 'fabien@bonustrack.co', 'password22', '{"name":"Fabien","avatar":"QmdR1QWmDxYTwoDo2hp9N5iGEMHKxPH2LyhE4ACkTndn84"}');
INSERT INTO posts (id, user_id, body, meta) VALUES ('1', '1', 'Singapore ♥️', '{"files":["Qmc7UJhrMqgQqib5voE6Sq19r1PsPwc3QtbmFvuwEnS3Yv"]}');
