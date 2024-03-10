import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Make sure to import L from 'leaflet'

// Placeholder icon URLs for each crop type
const cropIcons = {
  Paddy: 'https://png.pngtree.com/element_pic/17/07/31/95414b38118eab5f437f323ace3d721b.jpg', // Replace with actual path
  Millets: 'https://png.pngtree.com/element_pic/17/07/31/95414b38118eab5f437f323ace3d721b.jpg', // Replace with actual path
  // Add more icons for each crop type
};

// Simple modal component to show the total area
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1000,
    }}>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
};

const CropSelectionComponent = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [villages, setVillages] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchVillageData = (crop) => {
    axios.get(`/myapp/crop_data/?crop=${crop}`)
      .then(response => {
        setVillages(response.data.villages);
        setTotalArea(response.data.total_area);
        setModalOpen(true); // Open the modal on successful fetch
      })
      .catch(error => {
        console.error('There was an error!', error);
        setModalOpen(false); // Ensure modal is not opened on error
      });
  };

  // Function to create a custom icon based on the crop type
  const createIcon = (cropType) => {
    return L.icon({
      iconUrl: cropIcons[cropType] || 'https://png.pngtree.com/element_pic/17/07/31/95414b38118eab5f437f323ace3d721b.jpg', // Fallback to a default icon if none is specified
      iconSize: [35, 35], // You can adjust the size as needed
    });
  };

  return (
    <div>
      <select onChange={(e) => setSelectedCrop(e.target.value)} value={selectedCrop}>
        <option value="">Select a Crop</option>
        <option value="Paddy">Paddy</option>
        <option value="Millets">Millets</option>
        {/* Add more options based on your dataset */}
      </select>
      <button onClick={() => fetchVillageData(selectedCrop)}>Fetch Village Data</button>

      <MapContainer center={[11.0, 77.0]} zoom={8} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {villages.map((village, index) => (
          <Marker key={index} position={[village.latitude, village.longitude]} icon={createIcon(selectedCrop)}>
            <Popup>{village.village}: {village.crops[selectedCrop]} hectares</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal to display the total area */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>Total area for {selectedCrop}: {totalArea} hectares</p>
      </Modal>
    </div>
  );
};

export default CropSelectionComponent;
