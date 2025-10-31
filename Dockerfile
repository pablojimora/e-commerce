# ---- Etapa 1: Build ----
FROM node:20-alpine AS builder

# Crea y entra al directorio de la app
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# ---- Etapa 2: Run ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copia solo los archivos necesarios del builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expone el puerto 3000
EXPOSE 3000

# Comando por defecto para correr la app
CMD ["npm", "start"]
