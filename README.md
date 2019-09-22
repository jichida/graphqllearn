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

asm graphl框架先做：
1、注册&登录【手机号+验证码】
2、微信，QQ登录【使用微信或qq的tokenid登录】,先模拟一个
3、自动登录【使用上次登录成功后的token登录,以前自动登录是放saga里的，看看目前放哪里比较合适？】
4、获取用户资料
5、修改用户资料
6、发帖子【图片上传】https://www.apollographql.com/docs/apollo-server/data/file-uploads/
7、获取帖子列表【要使用分页】
8、获取帖子详情【通过id获取】
9、获取公告列表【要使用分页】
10、获取公告详情【通过id获取】
11、监视公告通知【使用subscriptions】

一、
signin:[phonenumber,authcode],{islogin:true/false,token:xxxx,userinfo:}
sendauth:[phonenumber,authtype:'signin'],{issuc:false/true,msg:xxxx}
signin:[signintype,token],{islogin:true/false,token:xxxx,data:}


http://localhost:4000/graphql
mutation {
  signin(phonenumber: "15961125167", authcode: "3724") {
    islogin
    token
    msg
    loginuserinfo{
      _id
      phonenumber
    }
  }
}

mutation {
  sendauth(phonenumber: "15961125167", authtype: "signin") {
    issuc
    msg
  }
}
