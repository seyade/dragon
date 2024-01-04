CREATE TABLE users (
    user_id SERIAL PRIMARY KEY
    -- Other user attributes
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
    question_prompt TEXT
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

