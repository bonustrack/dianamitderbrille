CREATE TABLE users (
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

CREATE TABLE users_meta (
  user_id VARCHAR(12) NOT NULL,
  key VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (`type`, `id`, `key`)
);

CREATE TABLE users_uploads (
  user_id VARCHAR(64) NOT NULL,
  ipfs_hash VARCHAR(20) NOT NULL,
  meta TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `ipfs_hash`)
);

CREATE TABLE settings (
  key VARCHAR(12) NOT NULL,
  value TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO users (id, email, password, name) VALUES ('1', 'fabien@bonustrack.co', 'password22', 'Fabien');
INSERT INTO users_meta (user_id, key, value) VALUES ('1', 'avatar', 'https://instagram.fbkk5-8.fna.fbcdn.net/v/t51.2885-19/s320x320/72229387_959197884442734_5367445652290666496_n.jpg?_nc_ht=instagram.fbkk5-8.fna.fbcdn.net&_nc_ohc=xM0LL93jKf0AX8VnvP8&oh=e3ff74aef154c465f2b4c2d9203d6e96&oe=5EB0CC7D');
