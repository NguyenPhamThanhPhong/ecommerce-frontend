const PropTypes = require('prop-types');
const axios = require('axios')

const baseUrl = 'http://localhost:8081';

// Utility function to append content to the #app element
function appendToApp(content) {
    const app = document.getElementById("app");
    const div = document.createElement("div");
    div.textContent = content;
    app.appendChild(div);
}

// Axios instance with default headers and cookies
const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Custom-Header": "HeaderValue",
    },
    withCredentials: true, // Include cookies
});

// GET request with path variable and query params
async function fetchData(id) {
    try {
        const response = await axiosInstance.get(`${baseUrl}/accounts/phong`, {
            params: { search: "example" },
        });
        appendToApp(`GET Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`GET Error: ${error.message}`);
    }
}



// POST request with body, headers, and cookies
async function createData() {
    try {
        const response = await axiosInstance.post(
            `${baseUrl}/resource`,
            { name: "New Resource", value: 42 },
            {
                headers: { Authorization: "Bearer token" },
            }
        );
        appendToApp(`POST Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`POST Error: ${error.message}`);
    }
}

// PUT request with path variable and body
async function updateData(id) {
    try {
        const response = await axiosInstance.put(`${baseUrl}/resource/${id}`, {
            name: "Updated Resource",
            value: 84,
        });
        appendToApp(`PUT Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`PUT Error: ${error.message}`);
    }
}

// PATCH request with path variable and partial body
async function patchData(id) {
    try {
        const response = await axiosInstance.patch(`${baseUrl}/resource/${id}`, {
            value: 100,
        });
        appendToApp(`PATCH Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`PATCH Error: ${error.message}`);
    }
}

// DELETE request with path variable
async function deleteData(id) {
    try {
        const response = await axiosInstance.delete(`${baseUrl}/resource/${id}`);
        appendToApp(`DELETE Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`DELETE Error: ${error.message}`);
    }
}

// Multipart/form-data request
async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", "File Upload Example");

    try {
        const response = await axiosInstance.post(`${baseUrl}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        appendToApp(`Upload Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
        appendToApp(`Upload Error: ${error.message}`);
    }
}

// Example usage
fetchData(1);
// Simulating file upload (requires a file input in the HTML)
document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        uploadFile(file);
    }
});
