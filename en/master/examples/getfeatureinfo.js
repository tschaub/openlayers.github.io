var wms = new ol.layer.TileLayer({
  source: new ol.source.TiledWMS({
    url: 'http://demo.opengeo.org/geoserver/wms',
    params: {'LAYERS': 'ne:ne'}
  })
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    parser: new ol.parser.GeoJSON(),
    url: 'data/countries.geojson'
  }),
  style: new ol.style.Style({rules: [
    new ol.style.Rule({
      symbolizers: [
        new ol.style.Polygon({
          strokeColor: '#bada55'
        })
      ]
    })
  ]}),
  transformFeatureInfo: function(features) {
    return features.length > 0 ?
        features[0].getFeatureId() + ': ' + features[0].get('name') : '&nbsp;';
  }
});

var map = new ol.Map({
  layers: [wms, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 1
  })
});

map.on('click', function(evt) {
  map.getFeatureInfo({
    pixel: evt.getPixel(),
    success: function(featureInfoByLayer) {
      document.getElementById('info').innerHTML = featureInfoByLayer.join('');
    }
  });
});
