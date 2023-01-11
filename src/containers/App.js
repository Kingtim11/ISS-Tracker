import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import issIcon from '../components/issIcon';

function App() {
  const [loading, setLoading] = useState(false)
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    setInterval(() => {
      getLocation()
    }, 5000);
  }, []);

  const getLocation = async () => {
    setLoading(true);
    await fetch("http://api.open-notify.org/iss-now.json")
      .then((response) => response.json())
          .then((data) => {
              setLongitude(data.iss_position.longitude);
              setLatitude(data.iss_position.latitude);
      })
    }

  function UpdateMap() {
    const map = useMap();
    map.setView({lng: longitude, lat: latitude})
  }

  return (
      <header className="ISS Tracker">
      {!loading ? 
        <h1>Loading...</h1> : (
        <MapContainer center={{lng: longitude, lat: latitude}} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={{lng:longitude, lat:latitude}} radius={80000} color={'red'} opacity={0.3}/>
          <Marker position={{lng:longitude, lat:latitude}} icon={issIcon()}/>
          <UpdateMap />
        </MapContainer>
      )}
      </header>
  );
}

export default App;
