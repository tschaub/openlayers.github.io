var raster = new ol.layer.TileLayer({
  source: new ol.source.TiledWMS({
    url: 'http://vmap0.tiles.osgeo.org/wms/vmap0',
    crossOrigin: null,
    params: {
      'LAYERS': 'basic',
      'VERSION': '1.1.1',
      'FORMAT': 'image/jpeg'
    }
  })
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    parser: new ol.parser.KML({
      maxDepth: 1, dimension: 2, extractStyles: true, extractAttributes: true
    }),
    url: 'data/kml/lines.kml'
  }),
  transformFeatureInfo: function(features) {
    var info = [];
    for (var i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    return info.join(', ');
  }
});

var map = new ol.Map({
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    projection: 'EPSG:4326',
    center: [-112.169, 36.099],
    zoom: 11
  })
});

map.on(['click', 'mousemove'], function(evt) {
  map.getFeatureInfo({
    pixel: evt.getPixel(),
    layers: [vector],
    success: function(featureInfo) {
      document.getElementById('info').innerHTML = featureInfo[0] || '&nbsp';
    }
  });
});
