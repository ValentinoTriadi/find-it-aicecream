CREATE TABLE sub_topic_star (
  sub_topic_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id UUID NOT NULL,
  PRIMARY KEY (sub_topic_id, user_id),
  FOREIGN KEY (sub_topic_id) REFERENCES sub_topic(id),
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);