const API_ENDPOINT = 'https://stationsapi-production.up.railway.app/api/stations';

export const fetchMarkers = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error('Failed to fetch markers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching markers:', error);
    throw error;
  }
};

export const addMarker = async (newMarker) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMarker),
    });
    if (!response.ok) {
      throw new Error('Failed to add marker');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding marker:', error);
    throw error;
  }
};

export const updateMarker = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update marker');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating marker:', error);
    throw error;
  }
};
