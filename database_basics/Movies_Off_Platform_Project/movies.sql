-- my work

CREATE TABLE films (
  name TEXT,
  release_year INTEGER
);

INSERT INTO films (name, release_year)
VALUES ('Hitch', 2005);

INSERT INTO films (name, release_year)
VALUES ('Shrek', 2001);

INSERT INTO films (name, release_year)
VALUES ('Rush Hour 2', 2001);

ALTER TABLE films
ADD COLUMN imbd_rating FLOAT;

ALTER TABLE films
ADD COLUMN motion_picture_rating TEXT;

UPDATE films
SET imbd_rating = 6.6, motion_picture_rating = 'PG-13'
WHERE name = 'Hitch';

UPDATE films
SET imbd_rating = 7.9, motion_picture_rating = 'PG'
WHERE name = 'Shrek';

UPDATE films
SET imbd_rating = 6.6, motion_picture_rating = 'PG-13'
WHERE name = 'Rush Hour 2';

ALTER TABLE films
ADD CONSTRAINT unique_name UNIQUE (name);