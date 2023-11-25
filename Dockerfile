# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /app

COPY . .

# Instale as dependências
RUN npm install

RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
