//export const websocket = ()=>{return new WebSocket("ws://localhost:8080/api/ws/super"}


const ws = () => {
  // return new WebSocket("ws://121.5.147.22:8080/api/ws/super")
  return new WebSocket("ws://127.0.0.1:8080/api/ws/super")
};

export default ws





