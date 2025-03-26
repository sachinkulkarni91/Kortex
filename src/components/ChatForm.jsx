import { BiSend } from 'react-icons/bi';

export default function ChatForm({ submitHandler, text, setText, isResponseLoading, errorText, pdfFile, setPdfFile, uploadPdfHandler }) {
  return (
    <div className='main-bottom'>
      {errorText && <p className='errorText'>{errorText}</p>}

      <form className='form-container' onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Send a message '
          spellCheck='false'
          value={isResponseLoading ? 'Going to service now and analysing ticket details…' : text}
          onChange={(e) => setText(e.target.value)}
          readOnly={isResponseLoading}
          fontcolor='black'
        />
        

        {!isResponseLoading && (
          <button type='submit'>
            <BiSend size={20} />
          </button>
        )}
      </form>
    </div>
  );
}
