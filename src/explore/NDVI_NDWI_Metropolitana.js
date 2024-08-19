
// 1. Define the metropolitan area of Monterrey as an irregular polygon

var municipiosNL = ee.Geometry.Polygon([
    [
      [-100.4645, 25.9021],  // Apodaca
      [-100.2631, 25.8704],  // Guadalupe
      [-100.2122, 25.7810],  // Juárez
      [-100.2510, 25.6191],  // Santiago
      [-100.4528, 25.5653],  // Santa Catarina
      [-100.5640, 25.6294],  // García
      [-100.5806, 25.8335],  // García
      [-100.5177, 25.9407],  // Escobedo
      [-100.4645, 25.9021]   // Cierre del polígono
    ]
  ]);
  
    Map.addLayer(municipiosNL, {}, "Monterrey Metropolitan Area");
    Map.centerObject(municipiosNL);
    
    // 2. Generate random points within the Monterrey metropolitan area
    var points = ee.FeatureCollection.randomPoints({
      region: municipiosNL,
      points: 100,  // Number of random points
      seed: 1
    });
    
    Map.addLayer(points, {color: 'red'}, "Random Points");
    
    // 3. Daily NDVI and NDWI Summary for Monterrey Metropolitan Area (2015-2016)
    // NDVI Collection
    var modisNDVI = ee.ImageCollection('MODIS/MOD09GA_NDVI')
                  .select('NDVI')
                  .filterDate('2015-01-01','2016-12-31')
                  .map(function(img){
                    var d = ee.Date(ee.Number(img.get('system:time_start')));
                    var y = ee.Number(d.get('year'));
                    var m = ee.Number(d.get('month'));
                    var day = ee.Number(d.get('day'));
                    return img.set({'year': y, 'month': m, 'day': day, 'date': d});
                  });
    
    // NDWI Collection
    var modisNDWI = ee.ImageCollection('MODIS/MOD09GA_006_NDWI')
                  .select('NDWI')
                  .filterDate('2015-01-01','2016-12-31')
                  .map(function(img){
                    var d = ee.Date(ee.Number(img.get('system:time_start')));
                    var y = ee.Number(d.get('year'));
                    var m = ee.Number(d.get('month'));
                    var day = ee.Number(d.get('day'));
                    return img.set({'year': y, 'month': m, 'day': day, 'date': d});
                  });
    
    // Combine NDVI and NDWI values for each point
    var combinedIndices = modisNDVI.map(function(ndviImg) {
      var correspondingNdwiImg = modisNDWI.filter(ee.Filter.eq('date', ndviImg.get('date'))).first();
      return points.map(function(point) {
        // Calculate the NDVI value for each point
        var ndviValue = ndviImg.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: point.geometry(),
          scale: 500,
          bestEffort: true,
          maxPixels: 1e8
        }).get('NDVI');
        
        // Calculate the NDWI value for each point
        var ndwiValue = correspondingNdwiImg.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: point.geometry(),
          scale: 500,
          bestEffort: true,
          maxPixels: 1e8
        }).get('NDWI');
    
        // Create a feature with the NDVI, NDWI, and date information for each point
        return ee.Feature(point.geometry(), {
          'date': ndviImg.get('date'),
          'year': ndviImg.get('year'),
          'month': ndviImg.get('month'),
          'day': ndviImg.get('day'),
          'NDVI': ndviValue,
          'NDWI': ndwiValue
        });
      });
    }).flatten().filter(ee.Filter.notNull(['NDVI', 'NDWI']));
    
    // 4. Export multiple daily NDVI and NDWI values as CSV file format
    Export.table(combinedIndices, 'NDVI_NDWI_Metropolitana_2015_2016_MultiPoint', {fileFormat: 'CSV'});