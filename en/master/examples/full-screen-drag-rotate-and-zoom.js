var map = new ol.Map({
  controls: ol.control.defaults({}, [
    new ol.control.FullScreen()
  ]),
  interactions: ol.interaction.defaults({}, [
    new ol.interaction.DragRotateAndZoom()
  ]),
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.BingMaps({
        key: 'Ar33pRUvQOdESG8m_T15MUmNz__E1twPo42bFx9jvdDePhX0PNgAcEm44OVTS7tt',
        style: 'Aerial'
      })
    })
  ],
  // Use the canvas renderer because it's currently the fastest
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [-33519607, 5616436],
    rotation: -Math.PI / 8,
    zoom: 8
  })
});
