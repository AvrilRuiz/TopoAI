// 1. Define the metropolitan area of Monterrey as an irregular polygon

var municipiosNL = ee.Geometry.Polygon([
  [
    [-100.65428082497156, 25.81134530084762],
    [-100.63093487770594, 25.78414399068067],
    [-100.60346905739344, 25.76312052244206],
    [-100.56639019997156, 25.745804281929864],
    [-100.55265728981531, 25.713638853635366],
    [-100.51557843239344, 25.677751768677517],
    [-100.47712628395594, 25.654233678434196],
    [-100.44004742653406, 25.63690159177746],
    [-100.39884869606531, 25.624519989070617],
    [-100.36451642067469, 25.608421986781007],
    [-100.35353009254969, 25.620805257955187],
    [-100.32057110817469, 25.600991408244408],
    [-100.31095807106531, 25.607183589095406],
    [-100.29173199684656, 25.583651596106016],
    [-100.27250592262781, 25.55763716681249],
    [-100.24778668434656, 25.531617087891878],
    [-100.23268048317469, 25.51922458962456],
    [-100.21620099098719, 25.505591363484715],
    [-100.21208111794031, 25.489477373426162],
    [-100.19972149879969, 25.467162127706185],
    [-100.17912213356531, 25.444842741832048],
    [-100.14753644020594, 25.41755787381967],
    [-100.13517682106531, 25.427480358833368],
    [-100.13655011208094, 25.44732287796649],
    [-100.14478985817469, 25.478320268249043],
    [-100.15989605934656, 25.503112428780174],
    [-100.17637555153406, 25.517985269406477],
    [-100.18873517067469, 25.53905197240615],
    [-100.19972149879969, 25.563831591141756],
    [-100.22032086403406, 25.58241294192919],
    [-100.23954693825281, 25.613375449226528],
    [-100.24915997536219, 25.630710950889764],
    [-100.23817364723719, 25.644329937134838],
    [-100.21620099098719, 25.6257582071063],
    [-100.19972149879969, 25.614613782761456],
    [-100.18186871559656, 25.59851444611489],
    [-100.15852276833094, 25.591083251924452],
    [-100.13105694801844, 25.591083251924452],
    [-100.10084454567469, 25.59851444611489],
    [-100.08436505348719, 25.600991408244408],
    [-100.06788556129969, 25.60966037163737],
    [-100.04865948708094, 25.634425373937738],
    [-100.04865948708094, 25.646805949521493],
    [-100.06101910622156, 25.66784998029764],
    [-100.06925885231531, 25.683939968669435],
    [-100.08299176247156, 25.6950779186662],
    [-100.11869732887781, 25.706214826973344],
    [-100.12281720192469, 25.730959780965613],
    [-100.11320416481531, 25.75446271778581],
    [-100.10221783669031, 25.77177769574695],
    [-100.10084454567469, 25.792799630072714],
    [-100.12281720192469, 25.795272553847752],
    [-100.13929669411219, 25.81381783765045],
    [-100.16401593239344, 25.81505408669786],
    [-100.22169415504969, 25.852135556122242],
    [-100.25190655739344, 25.848427932100922],
    [-100.28349225075281, 25.828651974506997],
    [-100.30958478004969, 25.83730436266618],
    [-100.34803692848719, 25.83359627377059],
    [-100.35764996559656, 25.85089969436436],
    [-100.37687603981531, 25.866964889605928],
    [-100.41120831520594, 25.86325773064898],
    [-100.41944806129969, 25.83112414995678],
    [-100.47437970192469, 25.83112414995678],
    [-100.49085919411219, 25.803927380806673],
    [-100.55540387184656, 25.842248300434843],
    [-100.65290753395594, 25.849663819690427],
    [-100.65428082497156, 25.81134530084762],
  ],
]);

Map.addLayer(municipiosNL, {}, "Monterrey Metropolitan Area");
Map.centerObject(municipiosNL);

// 2. Generate random points within the Monterrey metropolitan area
var points = ee.FeatureCollection.randomPoints({
  region: municipiosNL,
  points: 10000, // Number of random points
  seed: 1,
});

Map.addLayer(points, { color: "red" }, "Random Points");

// 3. Daily NDVI and NDWI Summary for Monterrey Metropolitan Area (2015-2016)
// NDVI Collection
var modisNDVI = ee
  .ImageCollection("MODIS/MOD09GA_006_NDVI")
  .select("NDVI")
  .filterDate("2018-01-01", "2018-06-01")
  .map(function (img) {
    var d = ee.Date(ee.Number(img.get("system:time_start")));
    var y = ee.Number(d.get("year"));
    var m = ee.Number(d.get("month"));
    var day = ee.Number(d.get("day"));
    return img.set({ year: y, month: m, day: day, date: d });
  });

// NDWI Collection
var modisNDWI = ee
  .ImageCollection("MODIS/MOD09GA_006_NDWI")
  .select("NDWI")
  .filterDate("2018-01-01", "2018-06-01")
  .map(function (img) {
    var d = ee.Date(ee.Number(img.get("system:time_start")));
    var y = ee.Number(d.get("year"));
    var m = ee.Number(d.get("month"));
    var day = ee.Number(d.get("day"));
    return img.set({ year: y, month: m, day: day, date: d });
  });

// Combine NDVI and NDWI values for each point
var combinedIndices = modisNDVI
  .map(function (ndviImg) {
    var correspondingNdwiImg = modisNDWI
      .filter(ee.Filter.eq("date", ndviImg.get("date")))
      .first();
    return points.map(function (point) {
      // Calculate the NDVI value for each point
      var ndviValue = ndviImg
        .reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: point.geometry(),
          scale: 500,
          bestEffort: true,
          maxPixels: 1e8,
        })
        .get("NDVI");

      // Calculate the NDWI value for each point
      var ndwiValue = correspondingNdwiImg
        .reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: point.geometry(),
          scale: 500,
          bestEffort: true,
          maxPixels: 1e8,
        })
        .get("NDWI");

      // Create a feature with the NDVI, NDWI, and date information for each point
      return ee.Feature(point.geometry(), {
        date: ndviImg.get("date"),
        year: ndviImg.get("year"),
        month: ndviImg.get("month"),
        day: ndviImg.get("day"),
        NDVI: ndviValue,
        NDWI: ndwiValue,
      });
    });
  })
  .flatten()
  .filter(ee.Filter.notNull(["NDVI", "NDWI"]));

// 4. Export multiple daily NDVI and NDWI values as CSV file format
Export.table(
  combinedIndices,
  "NDVI_NDWI_Metropolitana_2018_1_MultiPoint_10000",
  {
    fileFormat: "CSV",
  }
);
