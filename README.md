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
