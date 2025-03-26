import { AiOutlinePlus } from 'react-icons/ai'

export default function Sidebar({ previousChats = [] }) {  // ✅ Ensure default empty array
  const uniqueTitles = Array.from(new Set(previousChats.map(chat => chat.title).reverse()));

  return (
    <section className='sidebar'>
      <div className='sidebar-header' role='button'>
      <span style={{ color: 'white', fontSize: '25px',  position: 'relative', top: '-2px'  }}>&#43;</span>
        <button style={{ color: '#ffffff' }}>New Chat</button>
      </div>

      <div className='sidebar-history'>
        {uniqueTitles.length > 0 ? (  
          <>
            <p>Ongoing...</p>
            <ul>
              {uniqueTitles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>No previous chats</p> 
        )}
      </div>

      <div className='sidebar-info'>
        
      </div>
    </section>
  );
}
