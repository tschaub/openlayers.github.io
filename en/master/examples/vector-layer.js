var raster = new ol.layer.TileLayer({
  source: new ol.source.MapQuestOpenAerial()
});

// TODO: discuss scale dependent rules
ol.expr.register('resolution', function() {
  return map.getView().getView2D().getResolution();
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
          strokeColor: '#319FD3',
          strokeOpacity: 1,
          fillColor: '#ffffff',
          fillOpacity: 0.6
        })
      ]
    }),
    new ol.style.Rule({
      filter: 'resolution() < 5000',
      symbolizers: [
        new ol.style.Text({
          color: '#000000',
          text: ol.expr.parse('name'),
          fontFamily: 'Calibri,sans-serif',
          fontSize: 12
        })
      ]
    })
  ]})
});

var map = new ol.Map({
  layers: [raster, vector],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 1
  })
});

map.on(['click', 'mousemove'], function(evt) {
  map.getFeatures({
    pixel: evt.getPixel(),
    layers: [vector],
    success: function(featuresByLayer) {
      var features = featuresByLayer[0];
      document.getElementById('info').innerHTML = features.length > 0 ?
          features[0].getFeatureId() + ': ' + features[0].get('name') :
          '&nbsp;';
    }
  });
});
