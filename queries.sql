CREATE TABLE IF NOT EXISTS cookenu_users (
    id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS cookenu_recipes (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    author_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES cookenu_users(id)
);

CREATE TABLE IF NOT EXISTS cookenu_follows (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    followed_user VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES cookenu_users(id),
    FOREIGN KEY (user_followed) REFERENCES cookenu_users(id),
);

