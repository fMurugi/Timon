'use client'

import { useState, useEffect } from 'react';

const serverUrl = 'http://localhost:3006/api/askLangChain';
 
const AskPage =  () => {
    
    // pages/DocumentQA.js

  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [documentId, setDocumentId] = useState(null);

  const handleFileChange = (e) => {
    console.log("______________________________________-",e);
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  

  };

  const handleAsk = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('document', e.target.document.files[0]);
      formData.append('question', e.target.question.value);
      formData.append('name',e.target.document.files[0].name)
      
      console.log(formData)

      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      console.log(response)
   
      if (response) {
        const data = await response.json();
        console.log(data)
        setAnswer(data.data.text);
        // setDocumentId(data.document.id);
        console.log("got the anser")
      } else {
        setAnswer('An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAnswer('An error occurred.');
    }
  };
  // create method to save the question and anser to the database along with document id
  // Use the useEffect hook to save the question and answer to the database when documentId changes
  useEffect(() => {
    if (documentId) {
      saveQuestionAndAnswer(question, answer, documentId);
    }
  }, [documentId, question, answer]);

  const saveQuestionAndAnswer = async (question, answer, documentId) => {
    try {
      const response = await fetch('http://localhost:3006/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question, answer: answer, documentId: documentId }),
      });
      const data = await response.json();
      console.log(data);
      // You can handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };


  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    // saveQuestion(e.target.value)
  };


const saveDocument = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('name', e.target.document.files[0].name);
    formData.append('document', e.target.document.files[0]);

    console.log(formData);
    const response = await fetch('http://localhost:3006/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    });

    const data = await response.json();
    console.log(data);
    return data.id;
  } catch (error) {
    console.log(error);
  }
};


  //save the question to the database and get the question id back
  const saveQuestion = async (question) => {
    try {
      const response = await fetch('http://localhost:3006/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question: question})
      })
      const data = await response.json()
      console.log(data)
      return data.id
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Document QA App</h1>
      <form
        onSubmit={handleAsk}
        encType="multipart/form-data"
        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
      >
        <label htmlFor="document" className="mb-2">
          Upload Document:
        </label>
        <input
          type="file"
          name="document"
          id="document"
          accept=".txt,.pdf"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-lg"
        />
  
        <label htmlFor="question" className="mb-2">
          Ask a Question:
        </label>
        <input
          type="text"
          name="question"
          id="question"
          size="50"
          value={question}
          onChange={handleQuestionChange}
          className="mb-4 p-2 border rounded-lg"
        />
  
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </form>
  
      <h2 className="text-xl font-semibold mt-4">Answer:</h2>
      <p className="mt-2"  style={{ maxWidth: '500px' }}>{answer}</p>
    </div>
  );
  
}



export default AskPage;