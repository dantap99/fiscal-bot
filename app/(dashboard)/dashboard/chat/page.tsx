'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Send, Loader2, MessageSquare, PlusCircle } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTED_QUESTIONS = [
  'Que es RESICO y quien puede tributar ahi?',
  'Cuanto ISR pago si gano $30,000 al mes?',
  'Que gastos puedo deducir como persona fisica?',
  'Cuando debo presentar mi declaracion anual?',
  'Cual es la diferencia entre ISR e IVA?',
  'Como puedo facturar si soy freelancer?',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setInput('');
    inputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Read session ID from header
      const newSessionId = response.headers.get('X-Session-Id');
      if (newSessionId) {
        setSessionId(parseInt(newSessionId));
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: accumulatedContent }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content:
                  'Lo siento, hubo un error al procesar tu consulta. Intenta de nuevo.',
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <section className="flex-1 flex flex-col h-[calc(100dvh-68px)] lg:h-auto p-0 lg:p-4">
      <div className="flex items-center justify-between px-4 lg:px-0 py-3 lg:py-0 lg:mb-4">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">
          Chat Fiscal
        </h1>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="dark:border-emerald-800 dark:text-emerald-200/70"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Nueva consulta
          </Button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <div className="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-emerald-700 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Haz tu consulta fiscal
            </h2>
            <p className="text-gray-500 dark:text-emerald-200/50 text-center max-w-md mb-8">
              Pregunta sobre ISR, IVA, RESICO, deducciones, declaraciones,
              facturacion y cualquier tema fiscal mexicano.
            </p>

            {/* Suggested questions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-left px-4 py-3 rounded-xl border border-gray-200 dark:border-emerald-900/30 hover:border-emerald-500 dark:hover:border-emerald-700 bg-white dark:bg-[#0d1f18] text-sm text-gray-700 dark:text-emerald-200/70 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-emerald-700 text-white'
                      : 'bg-gray-100 dark:bg-[#0d1f18] text-gray-900 dark:text-emerald-100/90 border border-gray-200 dark:border-emerald-900/30'
                  }`}
                >
                  {message.content ? (
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-gray-500 dark:text-emerald-200/50">
                        Analizando tu consulta...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-emerald-900/30 p-4 bg-white dark:bg-[#071310]">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta fiscal..."
            className="flex-1 rounded-full bg-gray-50 dark:bg-[#0d1f18] border-gray-200 dark:border-emerald-900/30 focus-visible:ring-emerald-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-emerald-700 hover:bg-emerald-800 text-white h-10 w-10 flex-shrink-0"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-center text-xs text-gray-400 dark:text-emerald-200/30 mt-2">
          FiscalBot puede cometer errores. Verifica la informacion importante
          con un profesional.
        </p>
      </div>
    </section>
  );
}
