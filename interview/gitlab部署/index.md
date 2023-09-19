# 提交代码时自动把dist包上传到服务器上

- gitlab服务器和远程服务器通过ssh建立免密通道
- 通过ssh生成公私钥 把公钥配置到gitlab CICD变量里

```yml
  image: node:latest

  stages: 
  - install
  - build
  - deploy

  cache:
    key: 
      files: 
        - package-lock.json
    paths:
       - node_modules/
  
  install_job:
    stage: install
    script: npm install

  build_job:
    stage: build
    script: npm run build
    artifacts:
      paths: 
        - dist/

  deploy_job:
    stage: deploy
    script: scp -r dist root@192.168.1.10:/var/www/html/
```
