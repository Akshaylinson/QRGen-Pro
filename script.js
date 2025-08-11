document.addEventListener('DOMContentLoaded', () => {
  // Initialize QR Code for hero section
  const heroQrcode = new QRCode(document.getElementById('hero-qrcode'), {
    text: 'https://qrcodepro.com',
    width: 180,
    height: 180,
    colorDark: '#1e40af',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // Initialize main QR Code
  const qrcode = new QRCode(document.getElementById('qrcode'), {
    text: 'https://qrcodepro.com',
    width: 256,
    height: 256,
    colorDark: '#3b82f6',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // DOM Elements
  const qrInput = document.getElementById('qrInput');
  const qrSize = document.getElementById('qrSize');
  const qrColor = document.getElementById('qrColor');
  const qrColorText = document.getElementById('qrColorText');
  const generateBtn = document.getElementById('generateBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const downloadSvgBtn = document.getElementById('downloadSvgBtn');
  const qrFilename = document.getElementById('qrFilename');
  const downloadSection = document.getElementById('download-section');
  const qrcodePlaceholder = document.getElementById('qrcode-placeholder');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconPath = document.getElementById('theme-icon-path');
  const faqToggles = document.querySelectorAll('.faq-toggle');

  // Set initial state
  downloadSection.classList.remove('hidden');
  qrcodePlaceholder.classList.add('hidden');

  // Color picker synchronization
  qrColor.addEventListener('input', (e) => {
    qrColorText.value = e.target.value;
  });

  qrColorText.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      qrColor.value = e.target.value;
    }
  });

  // Generate QR Code
  const generateQR = () => {
    const text = qrInput.value.trim() || 'https://qrcodepro.com';
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
    downloadSection.classList.remove('hidden');
    qrcodePlaceholder.classList.add('hidden');
    
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

  // Download QR Code as PNG
  const downloadQR = () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
      const filename = qrFilename.value.trim() || 'qr-code';
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Download QR Code as SVG
  const downloadSvgQR = () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (canvas) {
      const filename = qrFilename.value.trim() || 'qr-code';
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
          <image href="${canvas.toDataURL('image/png')}" width="${canvas.width}" height="${canvas.height}"/>
        </svg>
      `;
      const blob = new Blob([svg], {type: 'image/svg+xml'});
      const link = document.createElement('a');
      link.download = `${filename}.svg`;
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Update icon
    if (isDark) {
      themeIconPath.setAttribute('d', 'M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z');
    } else {
      themeIconPath.setAttribute('d', 'M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z');
    }
  };

  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeIconPath.setAttribute('d', 'M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z');
  }

  // FAQ toggle functionality
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('svg');
      
      // Toggle content
      content.classList.toggle('hidden');
      
      // Rotate icon
      if (content.classList.contains('hidden')) {
        icon.classList.remove('rotate-180');
      } else {
        icon.classList.add('rotate-180');
      }
    });
  });

  // Event Listeners
  generateBtn.addEventListener('click', generateQR);
  qrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
  });
  qrSize.addEventListener('change', generateQR);
  qrColor.addEventListener('change', generateQR);
  qrColorText.addEventListener('change', generateQR);
  downloadBtn.addEventListener('click', downloadQR);
  downloadSvgBtn.addEventListener('click', downloadSvgQR);
  themeToggle.addEventListener('click', toggleDarkMode);

  // Generate initial QR code
  generateQR();
});
