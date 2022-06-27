//export const websocket = ()=>{return new WebSocket("ws://localhost:8080/api/ws/super"}

import {DEV_WEBSOCKET, PROD_WEBSOCKET} from "@/contants";

const isDev = process.env.NODE_ENV === 'development';

export const ws = () => {

  return new WebSocket(DEV_WEBSOCKET)
};





