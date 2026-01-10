import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [['babel-plugin-react-compiler', { target: '19' }]],
    },
  })],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000'
      },
      '/images':{
        target:'http://localhost:3000'
      }
    }
  }
  //base: '/react-course-practice/ecommerce-project/'
  /*
    build:{
      outDir:'../ecommerce-backend/dist'
      this adds the js file (dist) of jsx frontend to backend folder 
      run npm run build for confirming these steps
    }
  */
})
