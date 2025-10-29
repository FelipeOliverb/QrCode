import { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div className="app-container">
      <h1>Gerador de QR Code Personalizado</h1>

      <input
        type="text"
        placeholder="Digite algo para gerar QR Code"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-text"
      />

      <div className="logo-upload">
        <h2>Escolha a imagem para o seu QR Code</h2>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>

      <div className="preview">
        {logo && (
          <div className="logo-preview">
            <p>Logo selecionada:</p>
            <img src={logo} alt="Logo" />
          </div>
        )}
      </div>

      <div className="qr-section">
        {text && (
          <>
            <QRCodeCanvas
              ref={qrRef}
              value={text}
              size={256}
              bgColor="#000000ff"
              fgColor="#ffffff"
              level="H"
              imageSettings={
                logo
                  ? {
                      src: logo,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }
                  : undefined
              }
            />
            {/*<button className="download-btn" onClick={handleDownload}>
              Baixar QR Code
            </button>*/}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
