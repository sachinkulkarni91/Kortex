import { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import MainChat from '../components/MainChat';
//import FileUpload from './components/FileUpload';
import test from '../test.json'
const API_BASE_URL = "http://localhost:8001"; 

function Kortex() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [localChats, setLocalChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [pdfFile, setPdfFile] = useState(null); 
  const [conversationId, setConversationId] = useState(null); 
  const scrollToLastItem = useRef(null);

  const toggleSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

 
  const uploadPdfHandler = async () => {
    if (!pdfFile) {
      setErrorText("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', pdfFile);
    if (conversationId) {
      formData.append('conversation_id', conversationId);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/conversation/upload-document`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setConversationId(data.conversation_id);
        setErrorText('');
      } else {
        setErrorText(data.detail);
      }
    } catch (e) {
      setErrorText("Error uploading PDF.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!text) {
      setErrorText("Please enter a message.");
      return;
    }
    
    setIsResponseLoading(true);
    setErrorText("");
  
    const requestData = {
      query: text,  
      conversation_id: conversationId || null, 
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        mode: "cors",  
        credentials: "include",  
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json(); 
      setMessage(data.answer) 

      setPreviousChats((prev) => [
        ...prev,
        { role: "user", content: text },
        { role: "bot", content: data.answer },
      ]);
  
      //setConversationId(data.conversation_id); 
    } catch (error) {
      console.error("Error:", error);
      setErrorText("Failed to fetch response.");
    } finally {
      setIsResponseLoading(false);
      setText('');
    }
  };


  
 
  useEffect(() => {
    if (!conversationId) return;
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/conversation/history/${conversationId}`);
        const history = await response.text(); // Expecting raw text
        if (response.ok) {
          setPreviousChats([{ role: "history", content: history }]);
        }
      } catch (e) {
        console.error("Error fetching history", e);
      }
    };
    fetchHistory();
  }, [conversationId]);

  return (
    <div className='container'>
      <Sidebar previousChats={previousChats} />
      <MainChat
        currentTitle={currentTitle}
        currentChat={previousChats}
        toggleSidebar={toggleSidebar}
        isShowSidebar={isShowSidebar}
        submitHandler={submitHandler}
        text={text}
        setText={setText}
        isResponseLoading={isResponseLoading}
        errorText={errorText}
        pdfFile={pdfFile}
        setPdfFile={setPdfFile}
        uploadPdfHandler={uploadPdfHandler} // Pass the upload function
      />
    </div>
  );
}

export default Kortex;
