# Usa una imagen de Node.js
FROM node:18

# Crea y usa el directorio /app
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY ./src ./src

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "src/index.js"]
