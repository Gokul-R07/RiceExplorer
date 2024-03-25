import React, { useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { Modal, Button, Dropdown } from 'react-bootstrap'; 
import {
    LayersControl,
    MapContainer,
    TileLayer,
    useMap,
    GeoJSON,
    Popup,
    Marker
  } from "react-leaflet";
import { BASEMAPS } from "../../utils/constants";
  
  import "leaflet/dist/leaflet.css";
  import './style.css';


const CropSelectionComponent = () => {
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [villages, setVillages] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchVillageData = () => {
    axios.get(`/myapp/crop_data/?block=${selectedBlock}&crop=${selectedCrop}`)
      .then(response => {
        setVillages(response.data.villages);
        setTotalArea(response.data.total_area);
        setModalOpen(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setModalOpen(false);
      });
  };

const createIcon = (cropType) => {
   
    const cropIcons = {
      Paddy: 'https://static.thenounproject.com/png/3050925-200.png',
      Millets: 'https://static.thenounproject.com/png/1206891-200.png',
      Pulses: 'https://cdn0.iconfinder.com/data/icons/nuts-6/35/36-512.png',
      Cotton: 'https://www.svgrepo.com/show/441614/cotton.svg',
      Sugarcane: 'https://static.thenounproject.com/png/3925297-200.png',
      Oilseeds: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/oil-seed-3100074-2578101.png',
      Default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1qwJgYvxL2oKnLiBiGNqW2CFJpjY_MIOgzCWgE7oFg&s', // A default icon in case no specific icon is found for the crop type
    };
  
    const iconUrl = cropIcons[cropType] || cropIcons['Default']; 
    
    return L.icon({
      iconUrl,
      iconSize: [25, 25], 
      iconAnchor: [17, 35],
      popupAnchor: [0, -35],
    });
  };
  
  return (
    <div className='h-100 w-100'>
    <div className="flex">
        <div className='inner-flex'>
      <Dropdown>
          <Dropdown.Toggle variant="success" id="block-dropdown">
            {selectedBlock || 'Select a Block'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedBlock('Avinashi')}>Avinashi</Dropdown.Item>
         
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="crop-dropdown">
            {selectedCrop || 'Select a Crop'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedCrop('Paddy')}>Paddy</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCrop('Millets')}>Millets</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCrop('Pulses')}>Pulses</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCrop('Sugarcane')}>Sugarcane</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCrop('Cotton')}>Cotton</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedCrop('Oilseeds')}>Oilseeds</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        
        <div className="p-3 mr-2">
      <Button className="btn" variant="primary" onClick={fetchVillageData}>Fetch Village Data</Button>
      </div>
      </div>

      <MapContainer center={[11.0, 77.0]} zoom={8} style={{ height: '100vh', width: '100%' }}>
        <LayersControl position="topright">
          {Object.entries(BASEMAPS).map(([name, basemap]) => (
            <LayersControl.BaseLayer name={name} key={name} checked={name === "Google Maps"}>
              <TileLayer
                url={basemap.url}
                attribution={basemap.attribution}
              />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        {villages.map((village, index) => (
          <Marker 
          key={index} 
          position={[village.Latitude, village.Longitude]} 
          icon={createIcon(selectedCrop)} 
        >
            <Popup>{village.VillageName}: {village.Crops[selectedCrop]} hectares</Popup>
          </Marker>
        ))}
      </MapContainer>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Total Area for {selectedCrop}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{totalArea} hectares</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CropSelectionComponent;
