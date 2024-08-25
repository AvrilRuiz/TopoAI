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