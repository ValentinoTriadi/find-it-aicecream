-- Remove the old constraint
ALTER TABLE sub_topic_star
DROP CONSTRAINT sub_topic_star_star_check;

-- Alter the column type and add the new constraint
ALTER TABLE sub_topic_star
ALTER COLUMN star SET DATA TYPE INT,
ADD CONSTRAINT sub_topic_star_star_check CHECK (star BETWEEN 0 AND 3);