import { NextRequest } from 'next/server';
import { MATCH_DATABASE, PREMIER_LEAGUE_MATCHES } from '@/lib/match-data';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const matchId = searchParams.get('matchId') || PREMIER_LEAGUE_MATCHES[0].id;
  const bundle = MATCH_DATABASE[matchId] || MATCH_DATABASE['PL-2024-MATCH-842'];

  const match = bundle.metadata;
  const timeline = bundle.timeline;
  const factPacks = bundle.factPacks;

  // Speed multiplier: 1 = normal, 2 = fast, etc.
  const speed = Math.max(0.5, Math.min(5, parseFloat(searchParams.get('speed') || '1')));
  const intervalMs = Math.round(1500 / speed);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let isClosed = false;

      // Handle client disconnect
      req.signal.addEventListener('abort', () => {
        isClosed = true;
        try {
          controller.close();
        } catch {
          // Stream already closed
        }
      });

      // 1. Send initial match info
      const initPayload = JSON.stringify({
        match,
        totalEvents: timeline.length,
        timestamp: new Date().toISOString()
      });
      controller.enqueue(encoder.encode(`event: match_info\ndata: ${initPayload}\n\n`));

      // 2. Iterate through events
      for (let i = 0; i < timeline.length; i++) {
        if (isClosed) break;

        const event = timeline[i];
        const eventData = JSON.stringify({
          index: i,
          event,
          isLast: i === timeline.length - 1
        });

        controller.enqueue(encoder.encode(`event: match_event\ndata: ${eventData}\n\n`));

        // If this event triggers or belongs to a contested incident, emit incident alert
        if (event.isContested && event.incidentId && factPacks[event.incidentId]) {
          const factPack = factPacks[event.incidentId];
          const incidentData = JSON.stringify({
            incidentId: event.incidentId,
            factPack,
            triggerEvent: event
          });
          controller.enqueue(encoder.encode(`event: incident_flagged\ndata: ${incidentData}\n\n`));
        }

        // Delay between events to simulate live streaming
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }

      // 3. Send stream complete
      if (!isClosed) {
        controller.enqueue(encoder.encode(`event: stream_end\ndata: {"status": "MATCH_FINISHED"}\n\n`));
        try {
          controller.close();
        } catch {
          // ignore
        }
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  });
}
