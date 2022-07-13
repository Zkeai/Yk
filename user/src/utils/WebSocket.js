//export const websocket = ()=>{return new WebSocket("ws://localhost:8080/api/ws/super"}

import {DEV_WEBSOCKET, PROD_WEBSOCKET} from "@/contants";

export const ws = () => {

  return new WebSocket(PROD_WEBSOCKET)
};





