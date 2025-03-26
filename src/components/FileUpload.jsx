import { useState } from 'react';

export default function FileUpload({ pdfFile, setPdfFile, uploadPdfHandler }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
      alert('File size should be less than 5MB.');
      return;
    }

    setPdfFile(file);
    setFileName(file.name);
  };

  return (
    <div className="file-upload">
      <label className="file-label">
        Upload PDF:
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </label>
      {pdfFile && <p className="file-name">Uploaded: {fileName}</p>}
      {pdfFile && <button onClick={uploadPdfHandler}>Upload</button>}
    </div>
  );
}
