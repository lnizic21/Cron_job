CREATE TABLE base.gospel (
id 	BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
date DATE NOT NULL,
slug TEXT NOT NULL,
source_url TEXT DEFAULT 'https://hilp.hr/liturgija-dana/',
reference TEXT,
title TEXT,
intro TEXT,
gospel_text TEXT
);

ALTER TABLE base.gospel
 ADD CONSTRAINT gospel_unique_source_date UNIQUE (source_url,date);