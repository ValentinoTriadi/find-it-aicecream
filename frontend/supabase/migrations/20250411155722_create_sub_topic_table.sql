CREATE TABLE sub_topic (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  topic_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (topic_id) REFERENCES battle_map(id)
);