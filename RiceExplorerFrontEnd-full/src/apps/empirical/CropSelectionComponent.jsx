import React, { useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap'; // Importing Bootstrap components
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
// Assuming you have a basic CSS for Leaflet and Bootstrap included in your project

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

  // Function to create a custom icon based on the crop type
const createIcon = (cropType) => {
    // Mapping crop types to icon URLs
    const cropIcons = {
      Paddy: 'https://static.thenounproject.com/png/3050925-200.png',
      Millets: 'path/to/millets-icon.png',
      Pulses: 'path/to/pulses-icon.png',
      Cotton: 'path/to/cotton-icon.png',
      Sugarcane: 'path/to/sugarcane-icon.png',
      Oilseeds: 'path/to/oilseeds-icon.png',
      // Add more mappings for other crops as needed
      Default: 'path/to/default-icon.png', // A default icon in case no specific icon is found for the crop type
    };
  
    const iconUrl = cropIcons[cropType] || cropIcons['Default']; // Use the specific crop icon, or fallback to default
    
    return L.icon({
      iconUrl,
      iconSize: [35, 35], // You can adjust the size as needed
      iconAnchor: [17, 35], // Adjust according to the icon's size to position the icon correctly
      popupAnchor: [0, -35], // Adjust if necessary to position the popup correctly relative to the icon
    });
  };
  
  return (
    <div>
      <select onChange={(e) => setSelectedBlock(e.target.value)} value={selectedBlock}>
        <option value="">Select a Block</option>
        <option value="Avinashi">Avinashi</option>
        {/* Add more blocks as options here */}
      </select>

      <select onChange={(e) => setSelectedCrop(e.target.value)} value={selectedCrop}>
        <option value="">Select a Crop</option>
        <option value="Paddy">Paddy</option>
        <option value="Pulses">Pulses</option>
        <option value="Millets">Millets</option>
        <option value="Cotton">Cotton</option>
        <option value="Oilseeds">Oilseeds</option>
        {/* Add more crops as options here */}
      </select>

      <button onClick={fetchVillageData}>Fetch Village Data</button>

      <MapContainer center={[11.0, 77.0]} zoom={8} style={{ height: '400px', width: '100%' }}>
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
          icon={createIcon(selectedCrop)} // Use the createIcon function to set the icon based on the selectedCrop
        >
            <Popup>{village.VillageName}: {village.Crops[selectedCrop]} hectares</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bootstrap Modal for displaying total area */}
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
