# graphqllearn
https://github.com/benawad/graphql-mongo-server

https://github.com/Ojvind/yggdrasil

https://github.com/the-road-to-graphql/fullstack-apollo-react-boilerplate
https://github.com/the-road-to-graphql/fullstack-apollo-express-mongodb-boilerplate
https://github.com/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate

DEBUG=srv:* NODE_ENV=production configpath=/root/tools_dbbackup/scripts/polit_config.json pm2 start /root/tools_dbbackup/srvdbbackup/index.js --name=srvdbbackup  



DEBUG=srv:* NODE_ENV=production configpath=//Users/wangxiaoqing/Downloads/work201909/graphqllearn/deploy/scripts/config_local.json node index

本地调试：
DEBUG=srv:* NODE_ENV=development configpath=//Users/wangxiaoqing/Downloads/work201909/graphqllearn/deploy/scripts/config_local.json node index

远程：
DEBUG=srv:* NODE_ENV=development configpath=/root/graphqllearn/deploy/scripts/config_prod.json pm2 start /root/graphqllearn/deploy/srv/index.js --name=srvgraphqllearn

学习疑问：
1、发生错误时,如何查看错误行
2、分页机制
3、subscription处理
4、如何模拟客户端调试
=====
1、分页中如何定义自定义参数