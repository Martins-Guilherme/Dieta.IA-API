import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { routes } from "./routes";

const app = Fastify({ logger: true });
dotenv.config();
const PORT = Number(process.env.PORT) || 3333;

app.setErrorHandler((error, request, response) => {
  response.code(400).send({ message: error.message });
});

const start = async () => {
  // Registrando a rota para todos usiarios poderem acessar
  app.register(cors);
  // Registrando a rota
  app.register(routes);

  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Servidor rodando na porta ${PORT} 🚀🚀🚀}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
