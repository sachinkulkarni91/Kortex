import ChatMessage from './ChatMessage';
import EmptyChat from './EmptyChat';
import ChatForm from './ChatForm';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';

export default function MainChat({
  currentTitle,
  currentChat,
  toggleSidebar,
  isShowSidebar,
  submitHandler,
  text,
  setText,
  isResponseLoading,
  errorText,
  scrollToLastItem,
}) {
  return (
    <section className='main'>
      {!currentTitle && <EmptyChat />}

      {isShowSidebar ? (
        <MdOutlineArrowRight className='burger' size={28.8} onClick={toggleSidebar} />
      ) : (
        <MdOutlineArrowLeft className='burger' size={28.8} onClick={toggleSidebar} />
      )}

      <div className='main-header'>
        <ul ref={scrollToLastItem}>
          {currentChat.map((chatMsg, idx) => (
            <ChatMessage key={idx} chatMsg={chatMsg} isResponseLoading={isResponseLoading} />
          ))}
        </ul>
      </div>

      <ChatForm
        submitHandler={submitHandler}
        text={text}
        setText={setText}
        isResponseLoading={isResponseLoading}
        errorText={errorText}
      />
    </section>
  );
}
