'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, ChevronRight, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';

type Session = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessage?: string;
};

export default function ConsultasPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/chat/sessions?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-white">
          Mis Consultas
        </h1>
        <Link href="/dashboard/chat">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full">
            Nueva consulta
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 dark:text-emerald-400" />
        </div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <MessageSquare className="h-12 w-12 text-gray-300 dark:text-emerald-900/50 mb-4" />
            <h2 className="text-lg font-medium text-gray-500 dark:text-emerald-200/40 mb-2">
              No tienes consultas guardadas
            </h2>
            <p className="text-sm text-gray-400 dark:text-emerald-200/30 mb-6 text-center max-w-md">
              Tus conversaciones con el asistente fiscal aparecen aqui.
              Inicia una nueva consulta para comenzar.
            </p>
            <Link href="/dashboard/chat">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full">
                Iniciar consulta
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="hover:border-emerald-500 dark:hover:border-emerald-700 transition-colors"
            >
              <CardContent className="pt-0">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {session.title}
                      </h3>
                      {session.lastMessage && (
                        <p className="text-sm text-gray-500 dark:text-emerald-200/50 truncate mt-0.5">
                          {session.lastMessage}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-400 dark:text-emerald-200/30 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(session.updatedAt)}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-emerald-200/30">
                          {session.messageCount} mensaje
                          {session.messageCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteSession(session.id);
                      }}
                      disabled={deletingId === session.id}
                      className="text-gray-400 hover:text-red-500 dark:text-emerald-200/30 dark:hover:text-red-400"
                    >
                      {deletingId === session.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
