'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'elma';
  text: string;
  timestamp: Date;
}

interface BuildStep {
  id: number;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  logs: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'elma',
      text: 'Merhaba! Ben ELMA, sıralı işlem yöneticiniz. Kaynak kodunuzu yükleyin ve 6 adımlı build sürecini başlatayım. 🚀',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [buildSteps, setBuildSteps] = useState<BuildStep[]>([
    { id: 1, name: '📝 Derleme (Compile)', status: 'pending', progress: 0, logs: [] },
    { id: 2, name: '🔗 Bağlama (Linking)', status: 'pending', progress: 0, logs: [] },
    { id: 3, name: '📦 Paketleme (Bundling)', status: 'pending', progress: 0, logs: [] },
    { id: 4, name: '🧪 Test', status: 'pending', progress: 0, logs: [] },
    { id: 5, name: '⚡ Optimizasyon', status: 'pending', progress: 0, logs: [] },
    { id: 6, name: '🎁 Artifact Üretimi', status: 'pending', progress: 0, logs: [] },
  ]);

  const [isBuilding, setIsBuilding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (sender: 'user' | 'elma', text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateBuildProcess = async () => {
    setIsBuilding(true);
    addMessage('user', 'Build işlemini başlat!');
    addMessage('elma', '✅ Build süreci başlıyor... Tüm adımları izleyeceğim.');

    const steps = [...buildSteps];
    const buildLogs = [
      'Kaynak kod taranıyor...',
      'Bağımlılıklar kontrol ediliyor...',
      'Derleme başlıyor...',
      'Tüm dosyalar derlendi ✓',
      'Bağlama yapılıyor...',
      'Kütüphaneler bağlandı ✓',
      'Paketleme başlıyor...',
      'Tüm dosyalar paketlendi ✓',
      'Testler çalıştırılıyor...',
      'Tüm testler geçti ✓',
      'Optimizasyon yapılıyor...',
      'Kod minify edildi ✓',
      'Tree-shaking yapıldı ✓',
      'Artifact hazırlanıyor...',
      'Deploy edilebilir çıktı oluşturuldu ✓',
    ];

    for (let i = 0; i < steps.length; i++) {
      steps[i].status = 'running';
      setBuildSteps([...steps]);

      addMessage('elma', `🔄 Adım ${i + 1}: ${steps[i].name.substring(steps[i].name.indexOf(' ') + 1)} başladı...`);

      for (let progress = 0; progress <= 100; progress += 20) {
        steps[i].progress = progress;
        steps[i].logs.push(buildLogs[Math.floor(Math.random() * buildLogs.length)]);
        setBuildSteps([...steps]);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      steps[i].status = 'completed';
      steps[i].progress = 100;
      setBuildSteps([...steps]);

      addMessage('elma', `✅ Adım ${i + 1} tamamlandı: ${steps[i].name}`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    addMessage(
      'elma',
      '🎉 Tüm adımlar tamamlandı! Artifact üretimi başarılı. Deploy etmeye hazırsınız! 🚀'
    );
    setIsBuilding(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    addMessage('user', inputValue);
    setInputValue('');

    if (inputValue.toLowerCase().includes('build') || inputValue.toLowerCase().includes('başlat')) {
      setTimeout(() => {
        simulateBuildProcess();
      }, 500);
    } else {
      setTimeout(() => {
        addMessage('elma', `Anladım: "${inputValue}". Başka ne yapabilirim? Build başlatmak için "build" yazabilirsiniz.`);
      }, 500);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9' }}>
      {/* Sidebar - Build Steps */}
      <div
        style={{
          width: '300px',
          borderRight: '1px solid #30363d',
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#010409',
        }}
      >
        <h2 style={{ marginTop: 0, color: '#58a6ff' }}>📊 Build Adımları</h2>
        {buildSteps.map((step) => (
          <div
            key={step.id}
            style={{
              marginBottom: '15px',
              padding: '12px',
              backgroundColor: '#161b22',
              borderRadius: '6px',
              borderLeft: `3px solid ${
                step.status === 'completed'
                  ? '#3fb950'
                  : step.status === 'running'
                  ? '#58a6ff'
                  : step.status === 'failed'
                  ? '#f85149'
                  : '#30363d'
              }`,
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>{step.name}</div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#30363d',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${step.progress}%`,
                  height: '100%',
                  backgroundColor:
                    step.status === 'completed'
                      ? '#3fb950'
                      : step.status === 'running'
                      ? '#58a6ff'
                      : '#30363d',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '11px', marginTop: '4px', color: '#8b949e' }}>{step.progress}%</div>
          </div>
        ))}
      </div>

      {/* Main Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: msg.sender === 'user' ? '#238636' : '#21262d',
                  border: msg.sender === 'user' ? '1px solid #3fb950' : '1px solid #30363d',
                }}
              >
                <div style={{ fontSize: '14px' }}>{msg.text}</div>
                <div style={{ fontSize: '11px', marginTop: '4px', color: '#8b949e' }}>
                  {msg.timestamp.toLocaleTimeString('tr-TR')}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ borderTop: '1px solid #30363d', padding: '15px', backgroundColor: '#010409' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Komut girin... (örn: build başlat)"
              disabled={isBuilding}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #30363d',
                backgroundColor: '#0d1117',
                color: '#c9d1d9',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              disabled={isBuilding}
              style={{
                padding: '12px 20px',
                backgroundColor: '#238636',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: isBuilding ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: isBuilding ? 0.6 : 1,
              }}
            >
              {isBuilding ? '⏳ Yapılıyor...' : '📤 Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
