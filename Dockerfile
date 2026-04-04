FROM node:20-alpine
WORKDIR /app
COPY . .
RUN echo "hello from hatch"
EXPOSE 3000
CMD ["node", "-e", "require('http').createServer((req,res)=>res.end('ok')).listen(3000)"]