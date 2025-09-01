#En caso de producción usar version slim o investigar para evitar vulnerabilidades
#FROM node:20-slim
FROM node:20-alpine

WORKDIR /app

# Copiar package.json y package-lock.json primero (mejor caching)
COPY package*.json ./

RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto del backend
EXPOSE 3000

# Comando para iniciar el backend
CMD ["npm", "run", "dev"]
