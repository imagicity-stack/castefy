'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  senderUid: string;
  text: string;
}

export default function ChatPage() {
  const params = useParams<{ matchId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: '1', senderUid: 'me', text: 'Hey there! excited to match' },
      { id: '2', senderUid: 'them', text: 'Same here. How is your week going?' }
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), senderUid: 'me', text: input }]);
    setInput('');
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50 to-white px-4 py-6">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4">
        <div className="glass card-shadow rounded-2xl p-4">
          <p className="text-sm text-slate-600">Match ID: {params.matchId}</p>
        </div>
        <div className="glass card-shadow flex-1 overflow-y-auto rounded-2xl p-4">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                    msg.senderUid === 'me' ? 'ml-auto bg-brand-600 text-white' : 'bg-white'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
        <div className="glass card-shadow flex items-center gap-3 rounded-2xl p-3">
          <Input value={input} onChange={(e) => setInput(e.target.value)} className="w-full" placeholder="Say hi..." />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </main>
  );
}
