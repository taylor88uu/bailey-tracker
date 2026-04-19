import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const now = new Date();
  const min = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const max = new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString();
  try {
    const r = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + min + '&timeMax=' + max + '&singleEvents=true&orderBy=startTime&maxResults=250',
      { headers: { Authorization: 'Bearer ' + session.accessToken } }
    );
    const data = await r.json();
    const events = (data.items || []).map(e => ({
      id: e.id,
      title: e.summary || '(No title)',
      date: (e.start.date || e.start.dateTime || '').slice(0, 10),
      time: e.start.dateTime ? e.start.dateTime.slice(11, 16) : '',
      allDay: !!e.start.date,
      location: e.location || '',
      type: 'gcal',
    }));
    res.json({ events, holidays: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
}