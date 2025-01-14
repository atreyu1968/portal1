export const SERVER_CONFIG = {
  IP: '127.0.0.1', 
  PORT: 5173, // Client port
  API_PORT: 3001, // Server port
  get BASE_URL() {
    return `http://${this.IP}:${this.PORT}`;
  },
  get API_URL() {
    return `http://${this.IP}:${this.API_PORT}`;
  }
};