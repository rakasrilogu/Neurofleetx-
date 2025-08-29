import SockJS from 'sockjs-client';
import { Client as StompClient } from '@stomp/stompjs';

// Connects to SockJS endpoint and subscribes to /topic/vehicles.
// Returns an object that can be passed to disconnectVehicleTopic.
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
        } catch (e) {
          // ignore bad frames
        }
      });
    },
  });

  client.activate();
  return { client };
}

export function disconnectVehicleTopic(handle) {
  try {
    handle?.client?.deactivate();
  } catch {
    // ignore
  }
}
