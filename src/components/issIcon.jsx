import L from 'leaflet';

function issIcon() {
  return(
    L.icon({
      iconUrl: ('http://open-notify.org/Open-Notify-API/map/ISSIcon.png'),
      iconSize: [50,30]
    })
  )
}

export default issIcon;