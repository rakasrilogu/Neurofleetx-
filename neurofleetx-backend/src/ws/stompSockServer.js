const http = require('http');
const sockjs = require('sockjs');

function startSockJsStompServer(port) {
  const sockServer = sockjs.createServer({ prefix: '/ws' });
  const connections = new Map(); // conn.id -> { conn, buffer, subs: Map<subId, destination> }

  setInterval(() => {
    const topic = '/topic/vehicles';
    const payload = JSON.stringify({ vehicles: demoVehicles() });
    broadcastToTopic(topic, payload);
  }, 5000);

  sockServer.on('connection', (conn) => {
    connections.set(conn.id, { conn, buffer: '', subs: new Map() });

    conn.on('data', (chunk) => {
      const ctx = connections.get(conn.id);
      if (!ctx) return;
      ctx.buffer += chunk;
      processBuffer(ctx);
    });

    conn.on('close', () => connections.delete(conn.id));
  });

  const server = http.createServer();
  sockServer.installHandlers(server, { prefix: '/ws' });
  server.listen(port, '0.0.0.0', () => {
    console.log(`SockJS/STOMP listening on http://localhost:${port}/ws`);
  });

  function processBuffer(ctx) {
    let idx;
    while ((idx = ctx.buffer.indexOf('\0')) !== -1) {
      const frameStr = ctx.buffer.slice(0, idx);
      ctx.buffer = ctx.buffer.slice(idx + 1);
      if (frameStr.trim().length === 0) continue;
      handleFrame(ctx, parseFrame(frameStr));
    }
  }

  function parseFrame(str) {
    const sepIndex = str.indexOf('\n\n');
    const headerPart = sepIndex >= 0 ? str.slice(0, sepIndex) : str;
    const body = sepIndex >= 0 ? str.slice(sepIndex + 2) : '';
    const lines = headerPart.split('\n').map((l) => l.trim()).filter(Boolean);
    const command = lines.shift() || '';
    const headers = {};
    for (const line of lines) {
      const colon = line.indexOf(':');
      if (colon > -1) headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
    return { command, headers, body };
  }

  function handleFrame(ctx, frame) {
    const { command, headers } = frame;
    switch (command) {
      case 'CONNECT':
      case 'STOMP': {
        const connected = [
          'CONNECTED',
          'version:1.1',
          'heart-beat:0,0',
          '',
          ''
        ].join('\n');
        ctx.conn.write(connected + '\0');
        break;
      }
      case 'SUBSCRIBE': {
        const subId = headers.id || `sub-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const dest = headers.destination || '';
        ctx.subs.set(subId, dest);
        break;
      }
      case 'UNSUBSCRIBE': {
        const subId = headers.id;
        if (subId) ctx.subs.delete(subId);
        break;
      }
      case 'DISCONNECT': {
        try { ctx.conn.close(); } catch {}
        break;
      }
      default:
        break;
    }
  }

  function broadcastToTopic(destination, body) {
    for (const { conn, subs } of connections.values()) {
      for (const [subId, dest] of subs.entries()) {
        if (dest === destination) {
          sendMessage(conn, destination, body, subId);
        }
      }
    }
  }

  function sendMessage(conn, destination, body, subscriptionId) {
    const msgId = `msg-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const frame = [
      'MESSAGE',
      `destination:${destination}`,
      `message-id:${msgId}`,
      `subscription:${subscriptionId}`,
      'content-type:application/json',
      '',
      body
    ].join('\n');
    conn.write(frame + '\0');
  }

  function demoVehicles() {
    return [
      { id: 1, licensePlate: 'KA-01-AB-1234', location: '37.7749,-122.4194', status: 'active', mileage: 5300 + Math.floor(Math.random() * 200), fuelLevel: 60 + Math.floor(Math.random() * 30) },
      { id: 2, licensePlate: 'MH-12-XY-4321', location: '37.7849,-122.4094', status: 'idle', mileage: 8100 + Math.floor(Math.random() * 200), fuelLevel: 40 + Math.floor(Math.random() * 30) },
      { id: 3, licensePlate: 'DL-05-CQ-7777', location: '37.7649,-122.4294', status: 'active', mileage: 2500 + Math.floor(Math.random() * 200), fuelLevel: 70 + Math.floor(Math.random() * 20) }
    ];
  }
}

module.exports = { startSockJsStompServer };
