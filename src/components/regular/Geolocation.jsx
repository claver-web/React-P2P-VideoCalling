import React, { useEffect, useState } from 'react';

const GeoTracker = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  navigator.geolocation.getCurrentPosition((res) => {
    setLatitude(res.coords.latitude);
    setLongitude(res.coords.longitude);
    setAccuracy(res.coords.accuracy);
  })

  let audios = new Audio();
  audios.

  return (
    <div>
      
      
    </div>
  );
};

export default GeoTracker;
