import { db } from '@/lib/db/drizzle';
import { chatSessions, chatMessages } from '@/lib/db/schema';
import { getUser } from '@/lib/db/queries';
import { eq, desc, sql, and } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sessions = await db
      .select({
        id: chatSessions.id,
        title: chatSessions.title,
        createdAt: chatSessions.createdAt,
        updatedAt: chatSessions.updatedAt,
        messageCount: sql<number>`(
          SELECT COUNT(*) FROM chat_messages
          WHERE chat_messages.session_id = ${chatSessions.id}
        )`.as('message_count'),
        lastMessage: sql<string>`(
          SELECT content FROM chat_messages
          WHERE chat_messages.session_id = ${chatSessions.id}
          ORDER BY created_at DESC LIMIT 1
        )`.as('last_message'),
      })
      .from(chatSessions)
      .where(eq(chatSessions.userId, user.id))
      .orderBy(desc(chatSessions.updatedAt));

    return new Response(JSON.stringify(sessions), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify session belongs to user
    await db
      .delete(chatSessions)
      .where(
        and(
          eq(chatSessions.id, parseInt(id)),
          eq(chatSessions.userId, user.id)
        )
      );

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
