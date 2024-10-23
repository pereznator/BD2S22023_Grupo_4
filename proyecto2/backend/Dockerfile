# Etapa de compilación
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:18 AS production

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia las dependencias instaladas de la etapa de compilación
COPY --from=builder /app/node_modules ./node_modules

# Copia el código compilado
COPY --from=builder /app/dist ./dist

# Copia otros archivos necesarios (si tienes archivos estáticos o configuraciones)
COPY --from=builder /app/package*.json ./

# Exponer el puerto en el que corre la aplicación (modificar si usas otro puerto)
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "dist/index.js"]
