import Link from 'next/link';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch the list of documents from your API endpoint
    fetch('/api/documents') // Use the correct API endpoint for Next.js
      .then((response) => response.json())
      .then((data) => {
        setDocuments(data); // Assuming the API response is an array of documents
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <aside className="absolute w-64 top-0 left-0 h-full border-r border-gray-300 bg-white shadow-lg">
      <h2 className="text-lg font-semibold p-4 border-b border-gray-300">Documents</h2>
      <ul className="p-4">
        {documents.map((document) => (
          <li key={document.id} className="mb-2">
            <Link href={`/Documents`}>
              {document.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
