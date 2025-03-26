import { BiSolidUserCircle } from 'react-icons/bi';

export default function ChatMessage({ chatMsg,isResponseLoading }) {
  const isUser = chatMsg.role === 'user';

  let formattedMessage = chatMsg.content
    .replace(/\\n/g, '\n')  // Convert escaped newlines
    .replace(/\\"/g, '"')    
    .replace(/^"|"$/g, '');  


  const convoLines = formattedMessage.split('\n').filter((line) => line.trim() !== '');

  return (
    <li className="chat-message-wrapper">
      <div className={`message-container ${isUser ? "user-container" : "bot-container"}`}>
        {isUser ? (
          <span role="img" aria-label="robot" className="bot-icon"></span> 
        ) : (
          <span role="img" aria-label="robot" className="bot-icon"></span> 
        )}
        <div className="chat-container">
          {convoLines.map((line, index) => {
            if (line.toLowerCase().startsWith('user:')) {
              return (
                <p key={`user-${index}`} className="user-message">
                  <strong>User:-</strong> {line.replace(/user:\s*/i, '').trim()}
                </p>
              );
            } else if (line.toLowerCase().startsWith('bot:')) {
              return (
                <p key={`bot-${index}`} className="bot-message">
                  <strong>Bot:-</strong> {line.replace(/bot:\s*/i, '').trim()}
                </p>
              );
            } else {
              return (
                <p key={`text-${index}`} className="chat-text">
                  {line.trim()}
                </p>
              );
            }
          })}
        </div>
      </div>
    </li>
  );
}
