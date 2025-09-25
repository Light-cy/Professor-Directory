

// src/lib/api.js

// const API_BASE_URL = '/api'; // Using the proxy
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || '/api';

// --- Debugging Log ---
// This will log the base URL to the browser's console.
// On your deployed Netlify site, open the developer tools (F12) and check the console.
// - If it shows your full backend URL, the environment variable is working.
// - If it shows "/api", the VITE_BACKEND_URL variable was not available during the build.
console.log('API requests are being sent to:', API_BASE_URL);
// --- End Debugging Log ---

// Locally, this defaults to '/api' which is handled by the proxy in vite.config.js.
// On deployment (Netlify), it should use the VITE_BACKEND_URL environment variable.
//so to keep it good and simple

// const API_BASE_URL = '/api';
/**
 * A helper function to handle fetch responses.
 * @param {Response} response
 */
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'An unknown error occurred');
  }
  const result = await response.json();
  // The backend seems to wrap responses in a { success, data } object.
  if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message || 'An API error occurred');
    }
  }
  return result;
}

/**
 * Fetches all professors, optionally with a search query.
 * @param {string} query - The search term.
 * @returns {Promise<Array>}
 */
export async function getProfessors(query = '') {
  const response = await fetch(`${API_BASE_URL}/professors?search=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
}
/**
 * Fetches all professors (public endpoint, no auth headers).
 * @returns {Promise<Array>}
 */
export async function getAllProfessors() {
  const response = await fetch(`${API_BASE_URL}/professors`, {
    method: 'GET',
  });
  return handleResponse(response);
}
/**
 * Searches for professors (public endpoint).
 * @param {string} query - The search term.
 * @returns {Promise<Array>}
 */
export async function searchProfessors(query = '') {
  const response = await fetch(`${API_BASE_URL}/professors?search=${encodeURIComponent(query)}`, {
    method: 'GET',
  });
  return handleResponse(response);
}

/**
 * Fetches a single professor by their ID.
 * @param {string | number} id
 * @returns {Promise<Object>}
 */
export async function getProfessorById(id) {
  const response = await fetch(`${API_BASE_URL}/professors/${id}`, {
    method: 'GET',
    // Assuming this might be a protected route in the future
    // headers: getAuthHeaders(),
  });
  return handleResponse(response);
}

/**
 * Handles admin login.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>}
 */
export async function loginAdmin(username, password) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include' 
  });
  return handleResponse(response);
}

// You can add other functions here for POST, PUT, DELETE

/**
 * A helper function to create authenticated headers.
 * @returns {HeadersInit}
 */
function getAuthHeaders() {
  const token = localStorage.getItem('adminAuthToken');
  if (!token) {
    // This should ideally not happen if routes are protected,
    // but it's a good safeguard.
    throw new Error('No authentication token found. Please log in.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

/**
 * Uploads an image to the backend and returns the Cloudinary URL.
 * @param {FormData} formDataImage - The FormData containing the image file.
 * @returns {Promise<string>} - The Cloudinary image URL.
 */
export async function uploadImage(formDataImage) {
  const response = await fetch(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    body: formDataImage
  });
  const data = await response.json();
  if (data.success && data.url) {
    return data.url;
  } else {
    throw new Error(data.message || 'Image upload failed');
  }
}

/**
 * Adds a new professor.
 * @param {Object} professorData - The data for the new professor.
 * @returns {Promise<Object>}
 */
export async function addProfessor(professorData) {
  const response = await fetch(`${API_BASE_URL}/professors`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(professorData),
  });
  return handleResponse(response);
}

/**
 * Updates an existing professor.
 * @param {string | number} id - The ID of the professor to update.
 * @param {Object} professorData - The updated data.
 * @returns {Promise<Object>}
 */
export async function updateProfessor(id, professorData) {
  const response = await fetch(`${API_BASE_URL}/professors/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(professorData),
  });
  return handleResponse(response);
}

/**
 * Deletes a professor.
 * @param {string | number} id - The ID of the professor to delete.
 * @returns {Promise<void>}
 */
export async function deleteProfessor(id) {
  const response = await fetch(`${API_BASE_URL}/professors/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Failed to delete professor');
  }
  // DELETE often returns 204 No Content, so we don't try to parse JSON.
}