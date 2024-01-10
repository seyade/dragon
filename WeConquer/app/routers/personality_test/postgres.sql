CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth_provider_id VARCHAR(255) UNIQUE NOT NULL,  -- Auth0 `sub` value
    email VARCHAR(255) UNIQUE NOT NULL,
    family_name VARCHAR(255),
    given_name VARCHAR(255),
    locale VARCHAR(50),
    full_name VARCHAR(255),
    nickname VARCHAR(255),
    picture_url TEXT,
    last_updated TIMESTAMP,
    tier_type VARCHAR(50),
    sex VARCHAR(20),
    country VARCHAR(50),
    user_status TEXT,
    swipe_count INT DEFAULT 0,
    swipe_limit INT DEFAULT 100
);

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT,
    trait_type VARCHAR(100),
    sub_trait VARCHAR(100),
    question_prompt TEXT
    -- Other relevant information
);

CREATE TABLE user_answers (
    answer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    question_id INT REFERENCES questions(question_id),
    answer_text TEXT,
    answer_score INT,
    is_copy_paste BOOLEAN DEFAULT FALSE,
    answered_in_seconds INT,
    question_prompt TEXT,
    justification TEXT
);

CREATE TABLE personality_test_scores (
    user_id INT REFERENCES users(user_id),
    trait_type VARCHAR(100),
    score INT,
    PRIMARY KEY (user_id, trait_type)
);

CREATE TABLE user_test_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    package_id INT REFERENCES batch_package(package_id),
    batch_id INT REFERENCES question_batches(batch_id),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    is_batch_completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE question_batches (
    batch_id SERIAL PRIMARY KEY,
    question_ids INT[], -- Array of question IDs
    tier_type VARCHAR(100) -- 'free' or 'premium'
);

CREATE TABLE batch_package (
    package_id SERIAL PRIMARY KEY,
    batch_ids INT[], -- Array of question IDs
    tier_type VARCHAR(100) -- 'free' or 'premium'
);