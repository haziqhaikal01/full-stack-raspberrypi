import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   server: {
//     host: "127.0.0.1",
//     port: 5173, // or change to 3000
//     strictPort: true,
//     proxy: {
//       '/api': 'http://127.0.0.1:5000'
//   },
// }
// });

// vite.config.js
export default {
  server: {
    host: true, // make Vite accessible externally
    allowedHosts: [
      "6ffa-2a02-c7c-c8b-ec00-1145-399d-8a3d-9f7c.ngrok-free.app" // <-- your ngrok subdomain
    ]
  }
}
