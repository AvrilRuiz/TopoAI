-- Porqué no usar un autoincremental en SQLite:
-- https://www.sqlite.org/autoinc.html
-- Ya existe una columna `ROWID` predeterminada en SQLite
CREATE TABLE IF NOT EXISTS vegetation_index (
  point_id SMALLINT NOT NULL,
  date DATE NOT NULL,
  ndvi FLOAT(13) NOT NULL,
  ndwi FLOAT(13) NOT NULL,
  longitude FLOAT(13) NOT NULL,
  latitude FLOAT(13) NOT NULL
)

CREATE TABLE IF NOT EXISTS data_for_models (
  point_id SMALLINT NOT NULL,
  date DATE NOT NULL,eed
  ndvi FLOAT(13) NOT NULL,
  ndwi FLOAT(13) NOT NULL,
  longitude FLOAT(13) NOT NULL,
  latitude FLOAT(13) NOT NULL,
  temperature FLOAT(13) NOT NULL,
  soil_type VARCHAR(255) NOT NULL,
  season VARCHAR(255) NOT NULL,
  holiday VARCHAR(255) NOT NULL,
  altutude FLOAT(13) NOT NULL
);