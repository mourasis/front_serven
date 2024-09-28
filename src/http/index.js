import axios from 'axios';
/*eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyMTAwNzE2ZmRkOTA0ZTViNGQ0OTExNmZmNWRiZGZjOTg5OTk0MDEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTW91cmEganVuaW9yIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0kzeVFEamJGSm1XU09RWEd0ejJCTHdSekVRVll4bHFpMU81SHBweU9oNmxyLTQ0MTlXZFE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9qYS0yMjc4NSIsImF1ZCI6ImxvamEtMjI3ODUiLCJhdXRoX3RpbWUiOjE3MjY0MDU2ODUsInVzZXJfaWQiOiI0T21MTmZIOUFrZklSQWFJWXJxWHh2cGFFdjkyIiwic3ViIjoiNE9tTE5mSDlBa2ZJUkFhSVlycVh4dnBhRXY5MiIsImlhdCI6MTcyNjQwNTY4NSwiZXhwIjoxNzI2NDA5Mjg1LCJlbWFpbCI6Im1vdXJhc2lzdGVtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNDQyMDE4NjQ3ODQ0NTgwMTIwMiJdLCJlbWFpbCI6WyJtb3VyYXNpc3RlbWFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.EhOlbYiWTeQsA3aRr9ZQGsJjtdnTmO1SxeU8uBi6_cBHfMEt5EyHtVU9uUWJYgcesU2m52DUpUHsFxnZEjs8Am7LmrEbtxxQ7kQAowohvATCzqVocBR6kf9aIZ2VipF6qsZIuHR_HB5cwS0C_V5xcGxz74lnIqTwKeSAsBDdOszmOOV4pEEoGPCBJIrAgJX0415486iyVPgoiGbb59GrQK24GQ1Z90fhyqjkGxyLre1Lr6MQWcz25G3SHebZeFYmDHN7GAGuspJww3DrEiwiBpG6JP-UBcjGdafBzU6yczd8XYCLeGwHB8z7VHXvIOZoEmO4BLz0Dz8BjLSQmCXNWA*/
// Obter o token JWT do Firebase Authentication (se necessário)
const token = sessionStorage.getItem('authToken'); // Certifique-se de salvar o token ao fazer login

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Aponta para o backend Node.js
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // Envia o token JWT, se necessário
  }
});

// Intercepta respostas para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('authToken');
      // router.push('/login'); // Redireciona para login se o token for inválido
    }
    return Promise.reject(error);
  }
);

export default api;
