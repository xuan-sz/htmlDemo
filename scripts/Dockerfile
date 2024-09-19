FROM node:18
 
# 设置工作目录
WORKDIR /usr/src/app
 
# 复制package.json文件和package-lock.json文件
COPY pre-build/package*.json ./

COPY healthcheck.sh ./healthcheck.sh
 
# 安装项目依赖
RUN npm install
 
# 复制项目文件到工作目录
COPY pre-build .
 
# 暴露容器端口
EXPOSE 8080
 
# 容器启动命令
CMD ["node", "index.js"]