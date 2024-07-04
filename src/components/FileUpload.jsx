import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Simulación de llamada a API para mostrar información
    fetch('/api/information', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Información del archivo:', data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Cargar archivo</button>
    </form>
  );
};

export default FileUpload;