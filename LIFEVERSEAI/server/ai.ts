const BACKEND_URL = 'http://192.168.1.106:3000';

export type Msg = { role: 'user' | 'assistant'; content: string };

export async function askAI(messages: Msg[]): Promise<string> {
  const res = await fetch(`${BACKEND_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) throw new Error('Server error');
  const data = await res.json();
  return data.reply;
}