document.addEventListener('DOMContentLoaded', () => {
  // Initialize QR Code
  const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: 'Scan me to see this message!',
    width: 256,
    height: 256,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // DOM Elements
  const qrInput = document.getElementById('qrInput');
  const qrSize = document.getElementById('qrSize');
  const qrColor = document.getElementById('qrColor');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const shareBtn = document.getElementById('shareBtn');
  const filenameContainer = document.getElementById('filenameContainer');
  const qrFilename = document.getElementById('qrFilename');

  // Generate QR Code
  const generateQR = () => {
    const text = qrInput.value.trim() || 'Scan me to see this message!';
    const size = parseInt(qrSize.value);
    const color = qrColor.value;
    
    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';
    
    // Create new QR code
    new QRCode(document.getElementById('qrcode'), {
      text: text,
      width: size,
      height: size,
      colorDark: color,
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download options
    filenameContainer.classList.remove('hidden');
    
    // Set default filename based on input
    if (text.startsWith('http')) {
      try {
        const url = new URL(text);
        qrFilename.value = url.hostname.replace('www.', '') || 'qr-code';
      } catch {
        qrFilename.value = 'qr-code';
      }
    } else {
      qrFilename.value = text.substring(0, 20).replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'qr-code';
    }
  };

  // Download QR Code
  const downloadQR = () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
      const filename = qrFilename.value.trim() || 'qr-code';
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      alert('Please generate a QR code first');
    }
  };

  // Share QR Code
  const shareQR = async () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `${qrFilename.value || 'qr-code'}.png`, { type: blob.type });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'QR Code',
            text: 'Check out this QR code I generated',
            files: [file]
          });
        } else {
          // Fallback for browsers that don't support sharing files
          const link = document.createElement('a');
          link.href = dataUrl;
          link.target = '_blank';
          link.click();
        }
      } catch (err) {
        console.error('Error sharing:', err);
        alert('Sharing failed. Please try downloading instead.');
      }
    } else {
      alert('Please generate a QR code first');
    }
  };

  // Event Listeners
  generateBtn.addEventListener('click', generataeQR);
  qrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
  });
  qrSize.addEventListener('change', generateQR);
  qrColor.addEventListener('change', generateQR);
  downloadBtn.addEventListener('click', downloadQR);
  shareBtn.addEventListener('click', shareQR);

  // Generate initial QR code
  generateQR();
});
