import { useEffect, useState } from "preact/hooks";

const WS_URL = "ws://localhost:8080";

export const useWebSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null> (null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
            console.log("Connected..game started");
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("disconnected");
            setSocket(null);
        }

        return () => {
            ws.close();
        }

    }, [])

    return socket;
}