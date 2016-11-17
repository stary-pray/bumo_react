# 恋绘·星祈
恋绘的前端项目

------

## 使用技术
Web 主要是 React，Webpack，Docker（部署）
Mobile 主要是 React Native
共用技术有 Redux，Redux saga。web 和 mobile 这两端是基本上共用数据层的逻辑的

## 启动项目
### Web 端
1. clone 下来
  ```
$ git clone https://github.com/stary-pray/bumo_react
  ```

2. 进入 web 目录，安装依赖以及做项目准备
  ```
$ cd bumo_react/web
$ npm install && npm run prepare
  ```
  
3. 把 dev.6koi.com 添加到hosts
（你也可以自己手动做这步。CORS happy）
  ```
$ sudo echo "127.0.0.1  dev.6koi.com" >> /etc/hosts
  ```

4. 运行

  ```
$ npm start
  ```
  
5. 运行成功后，用浏览器打开 http://dev.6koi.com:3000
  
### Mobile 端
todo

------
## 注意
该前端项目直接连接 恋绘·星祈 production 后端，请不要作出破坏行为。=A=
