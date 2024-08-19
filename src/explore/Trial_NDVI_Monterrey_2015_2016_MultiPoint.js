// 1. Define the metropolitan area of Monterrey as an irregular polygon
var monterreyMetro = ee.Geometry.Polygon([
    [
      [-100.4938, 25.8604],  // Point 1
      [-100.5965, 25.7540],  // Point 2
      [-100.6505, 25.5848],  // Point 3
      [-100.5374, 25.3935],  // Point 4
      [-100.3139, 25.3874],  // Point 5
      [-100.1884, 25.4861],  // Point 6
      [-100.1357, 25.6607],  // Point 7
      [-100.2702, 25.7821],  // Point 8
      [-100.4938, 25.8604]   // Closing the polygon
    ]
  ]);
  
  Map.addLayer(monterreyMetro, {}, "Monterrey Metropolitan Area");
  Map.centerObject(monterreyMetro);
  
  // 2. Generate random points within the Monterrey metropolitan area
  var points = ee.FeatureCollection.randomPoints({
    region: monterreyMetro,
    points: 100,  // Number of random points
    seed: 1
  });
  
  Map.addLayer(points, {color: 'red'}, "Random Points");
  
  // 3. Daily NDVI Summary for Monterrey Metropolitan Area (2015-2016)
  var modis = ee.ImageCollection('MODIS/MOD09GA_NDVI')
              .select('NDVI')
              .filterDate('2015-01-01','2016-12-31')
              .map(function(img){
                var d = ee.Date(ee.Number(img.get('system:time_start')));
                var y = ee.Number(d.get('year'));
                var m = ee.Number(d.get('month'));
                var day = ee.Number(d.get('day'));
                return img.set({'year': y, 'month': m, 'day': day, 'date': d});
              });
  
  var NDVI_Monterrey = modis.map(function(img) {
    return points.map(function(point) {
      // Calculate the NDVI value for each point
      var ndviValue = img.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: point.geometry(),
        scale: 500,
        bestEffort: true,
        maxPixels: 1e8
      }).get('NDVI');
  
      // Create a feature with the NDVI value and date information for each point
      return ee.Feature(point.geometry(), {
        'date': img.get('date'),
        'year': img.get('year'),
        'month': img.get('month'),
        'day': img.get('day'),
        'NDVI': ndviValue
      });
    });
  }).flatten().filter(ee.Filter.notNull(['NDVI']));
  
  // 4. Export multiple daily NDVI values as CSV file format
  Export.table(NDVI_Monterrey, 'NDVI_Monterrey_2015_2016_MultiPoint', {fileFormat: 'CSV'});