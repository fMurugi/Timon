'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DocumentPage = () => {
  const router = useRouter();
  const { documentId } = router.query;

  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    if (documentId) {
      // Fetch document data by documentId from your API endpoint
      fetch(`/api/documents/${documentId}`)
        .then((response) => response.json())
        .then((data) => {
          setDocumentData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [documentId]);

  if (!documentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{documentData.name}</h1>
      <p>{documentData.content}</p>

      <h2>Questions and Answers:</h2>
      <ul>
        {documentData.questions.map((question) => (
          <li key={question.id}>
            <strong>Question:</strong> {question.question}
            <br />
            <strong>Answer:</strong> {question.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPage;
