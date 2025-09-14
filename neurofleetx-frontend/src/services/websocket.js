import SockJS from 'sockjs-client';
import { Client as StompClient } from '@stomp/stompjs';

export function connectVehicleTopic(wsUrl, onMessage) {
  const client = new StompClient({
    debug: () => {},
    reconnectDelay: 5000,
    webSocketFactory: () => new SockJS(wsUrl),
    onConnect: () => {
      client.subscribe('/topic/vehicles', (msg) => {
        try {
          const body = JSON.parse(msg.body);
          onMessage?.(body);
        } catch (e) {}
      });
    },
  });

  client.activate();
  return { client };
}

export function disconnectVehicleTopic(handle) {
  try {
    handle?.client?.deactivate();
  } catch {}
}
