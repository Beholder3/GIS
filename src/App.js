import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

const markers = [
  {
    geocode: [54.022, 21.77],
    popUp: {
      name: 'Stacja 1',
      hours: 'Godziny otwarcia: 9:00-18:00',
      phone: 'Telefon: 123-456-789'
    }
  },
  {
    geocode: [54.03, 21.78],
    popUp: {
      name: 'Stacja 2',
      hours: 'Godziny otwarcia: 9:00-18:00',
      phone: 'Telefon: 123-456-789'
    }
  },
  {
    geocode: [54.035, 21.76],
    popUp: {
      name: 'Stacja 3',
      hours: 'Godziny otwarcia: 9:00-18:00',
      phone: 'Telefon: 123-456-789'
    }
  },
];

const customIcon = new Icon({
  iconUrl: require('./gas-pump.png'),
  iconSize: [30, 30],
});

const customIcon2 = new Icon({
  iconUrl: require('./placeholder.png'),
  iconSize: [30, 30],
});

function AddMarkerOnClick({ active, markers, setMarkers, setAddingMarker }) {
  useMapEvents({
    click(e) {
      if (active) {
        const newMarker = {
          geocode: [e.latlng.lat, e.latlng.lng],
          popUp: {
            name: 'Nowa stacja',
            hours: 'Godziny otwarcia: 9:00-18:00',
            phone: 'Telefon: 123-456-789',
          },
          icon: customIcon2,
        };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        setAddingMarker(false);
      }
    },
  });

  return null;
}

function MarkerForm({ markers, setMarkers, selectedMarkerIndex, setSelectedMarkerIndex, setEditing, setDeleting }) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleHoursChange = (e) => setHours(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSave = () => {
    const formattedHours = `Godziny otwarcia: ${hours}`;
    const formattedPhone = `Telefon: ${phone}`;

    const updatedMarkers = markers.map((marker, index) => {
      if (index === selectedMarkerIndex) {
        return { ...marker, popUp: { name, hours: formattedHours, phone: formattedPhone } };
      }
      return marker;
    });

    setMarkers(updatedMarkers);
    setSelectedMarkerIndex(null);
    setEditing(false);
  };

  const handleDelete = () => {
    const updatedMarkers = markers.filter((marker, index) => index !== selectedMarkerIndex);
    setMarkers(updatedMarkers);
    setSelectedMarkerIndex(null);
    setEditing(false); 
    setDeleting(false);
  };

  if (selectedMarkerIndex === null) {
    return null;
  }

  return (
    <div className="marker-form">
      <label>
        Nazwa stacji:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Godziny otwarcia:
        <input type="text" value={hours} onChange={handleHoursChange} />
      </label>
      <label>
        Telefon:
        <input type="text" value={phone} onChange={handlePhoneChange} />
      </label>
      <button onClick={handleSave}>Zapisz</button>
      <button onClick={handleDelete}>Usuń punkt</button>
    </div>
  );
}

function App() {
  const [markerList, setMarkerList] = useState(markers);
  const [addingMarker, setAddingMarker] = useState(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAddMarkerClick = () => {
    setAddingMarker(true);
    setSelectedMarkerIndex(null);
    setEditing(false);
    setDeleting(false);
  };

  const handleEditMarkerClick = () => {
    setEditing(true);
    setAddingMarker(false);
    setDeleting(false);
  };

  const handleDeleteMarkerClick = () => {
    setDeleting(true);
    setAddingMarker(false);
    setEditing(false);
  };

  const handleMarkerClick = (index) => {
    if (editing || deleting) {
      setSelectedMarkerIndex(index);
      setAddingMarker(false);
    }
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleAddMarkerClick}>Dodaj punkt</button>
        <button onClick={handleEditMarkerClick}>Edytuj punkt</button>
      </div>
      <MapContainer center={[54.038, 21.767]} zoom={13.5} style={{ height: '100vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup>
          {markerList.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode}
              icon={marker.icon || customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
            >
              <Popup>
                <div>
                  <div>{marker.popUp.name}</div>
                  <div>{marker.popUp.hours}</div>
                  <div>{marker.popUp.phone}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <AddMarkerOnClick active={addingMarker} markers={markerList} setMarkers={setMarkerList} setAddingMarker={setAddingMarker} />
        <MarkerForm
          markers={markerList}
          setMarkers={setMarkerList}
          selectedMarkerIndex={selectedMarkerIndex}
          setSelectedMarkerIndex={setSelectedMarkerIndex}
          setEditing={setEditing}
          setDeleting={setDeleting}
        />
      </MapContainer>
    </div>
  );
}

export default App;
