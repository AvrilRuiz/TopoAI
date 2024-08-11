# TopoAI

[Overleaf de Artículo](https://www.overleaf.com/project/66b5bb6c4e85032259e3ab2e)

[Presentación de Introducción](resources/01-intro.pdf)

## Posibles Análisis

1. **Cambios en la vegetación**

Comparar los mapas de [NDVI](#ndvi) de 2018 y 2023. Identificar áreas donde la
vegetación ha aumentado (posible reforestación o crecimiento natural)
o disminuido (posible urbanización o deforestación).

2. **Cambios en los recursos hı́dricos**

Analizar los mapas de [NDWI](#ndwi) para detectar cambios en cuerpos de agua o
en el contenido de agua de la vegetación. Identificar nuevos desarrollos
urbanos que puedan haber afectado la distribución del agua.

3. **Impacto del desarrollo urbano**

Utilizar [SAVI](#savi) para evaluar cambios en áreas con vegetación dispersa, que
podrı́an indicar expansión urbana o cambios en el uso agrı́cola del suelo.

## Lugares Geográficos

Se debe elegir 1 de los siguientes lugares geográficos para realizar el análisis:

- Área Metropolitana de Monterrey
- Sierra Madre Occidental
- Región Citrı́cola (_Montemorelos, General Terán, Hualahuises_)
- Presa El Cuchillo y sus alrededores
- Zona del Altiplano (_Dr. Arroyo, Galeana, Aramberri_)
- Parque Nacional Cumbres de Monterrey
- Zona Fronteriza (_Colombia, Anáhuac_)
- Valle de Derramadero (_entre Saltillo y Monterrey_)
- Laguna de Sánchez
- Cerro de la Silla

> [!NOTE]  
> Posibles **justificaciones y razones** de cuál de los lugares geográficos a elegir se pueden encontrar la [presentación de introducción](resources/01-intro.pdf).

## Datos

- [Google Earth Engine](https://earthengine.google.com/)
- [Sentinel Hub](https://apps.sentinel-hub.com/eo-browser/?zoom=10&lat=41.9&lng=12.5&themeId=DEFAULT-THEME&toTime=2024-08-08T02:42:01.595Z)
- [NASA Giovanni](https://giovanni.gsfc.nasa.gov/giovanni/)
- [US Earth Explorer](https://earthexplorer.usgs.gov/)
- [Copernicus](https://scihub.copernicus.eu/)
- [Global Forest Watch](https://www.globalforestwatch.org/)
- [UN Spider](https://www.un-spider.org/)

## Sugerencia de Libros

- **_Geostatistics for Environmental and Geotechnical Applications_** por Shao-Chiang J. Wei y Raúl L. González
- **_An Introduction to Applied Geostatistics_** por Edward H. Isaaks y R. Mohan Srivastava
- **_Geostatistics: Modeling Spatial Uncertainty_** por Jean-Paul Chiles y Pierre Delfiner
- **_Practical Geostatistics 2000_** por Isobel Clark y William V. Harper

**Sobre agua**

- **_Introduction to Geostatistics: Applications in Hydrogeology_** por P. K. Kitanidis

## Conceptos

### Índices

#### NDVI

Valores más altos indican vegetación más saludable y densa.

$NDVI = \frac{NIR - Red}{NIR + Red}$

#### SAVI

$SAVI = \frac{NIR - Red}{NIR + Red + L} \cdot (1 + L)$

Similar al NDVI, pero ajustado para minimizar el efecto del suelo en áreas con vegetación dispersa.

#### NDWI

$NDWI = \frac{Green - NIR}{Green + NIR}$

Valores más altos indican mayor contenido de agua en la vegetación o presencia de cuerpos de agua.

## Modelos

- [Video Kringing](https://www.youtube.com/watch?v=J-IB4_QL7Oc)
