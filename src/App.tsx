import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [text, setText] = useState(''); 

  return (
    <div className="app-container">
      <div className='titulo'>
        <h1>Gerador de QR Code</h1>
      </div>
      
      
      <input
        type="text"
        placeholder="Digite algo para gerar QR Code"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div>
        {text && <QRCodeCanvas value={text} size={256} />}
      </div>
    </div>
  );
}

export default App;
