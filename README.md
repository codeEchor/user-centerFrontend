

# 一，用户中心前端环境搭建

## 1.1 创建项目脚手架

使用Ant Design Pro 框架（现成的后台管理系统）

地址：[开箱即用的中台前端/设计解决方案 - Ant Design Pro](https://pro.ant.design/zh-CN) 

阅读开始文档，创建脚手架项目

**启动项目**

在项目根目录下执行 `npm run start`, 即可启动项目。

## 1.2 项目结构

~~~~
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
~~~~



## 1.3 项目瘦身

删除没有使用的目录

# 二，用户中心后端环境搭建

## 2.1 技术选型

springboot2+mysql8+mybatisPlus+lombok+spring+springMVC+junit

## 2.2 Autowired和Resource的区别

Autowired是根据bean的类型进行装配的，

Resource是根据bean的名字进行装配的,当找不到与名称匹配的bean时才按照类型进行装配

Autowired想使用name进行装配，可以结合Qualifier使用

Autowired+Qualifier=Resoure

# 三，数据库设计

## 3.1 数据库建表设计

表名  字段，类型，索引，约束等

## 3.2 表的设计

id  主键  自增   bigint
userName   昵称   varchar(256)
userAccount   账号  varchar(256)
avatarUrl  头像	varchar(256)
userPassword  密码  varchar(256)
phone   电话   varchar(128)
email    邮箱   varchar(256)
gender   性别  tinyint    0 女  1男
status    状态 默认0为正常状态， 封号，注销....   int
isDelete  逻辑删除  默认为0  tinyint
createTime   创建时间   datetime
updateTime   更新时间   datetime

~~~sql
select current_timestamp  # 2024-09-05 19:36:42
~~~

varchar不设置长度，默认是256个字节，其最大的长度为65556。

tinyint可以存入1个字节大小，存储范围：-128到127

# 四，功能实现

## 4.1 注册功能

1. 传递参数：账户名，账户密码，校验密码

2. 判断账户名，账户密码是否符合规则
   1. 判断账户名，账户密码，校验密码非空
   2. 判断账户密码与校验密码是否一致
   3. 账号名长度不低于4位
   4. 账户密码长度不低于8位
   5. 账户不能重复
   6. 账户名不包含特殊字符

3. 对用户的密码进行加密处理(MD5) 
4. 将注册用户信息保存数据库

MD5加密算法工具类的使用：

~~~java
   	@Test
    public void TestMD5()   {
        String s = DigestUtils.md5DigestAsHex(("abc"+"yupi").getBytes(StandardCharsets.UTF_8));
        System.out.println("s = " + s);
    }
~~~

判断多个字符串为空的工具类

~~~xml
 <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
    <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-lang3</artifactId>
      <version>3.12.0</version>
    </dependency>
~~~

~~~java
 if (StringUtils.isAnyBlank(userAccount,password,checkPwd))
           {
                return -1;
            }
~~~

此工具类在底层对字符串进行了非null，非空串，非" "的判断

## 4.2 登录功能

1. 传递参数：账户名，账户密码
2. 判断账户名，账户密码是否符合规则
   1. 判断账户名，账号密码非空
   2. 账号名长度不低于4位
   3. 账户密码长度不低于8位
   4. 账户名不包含特殊字符
3. 判断用户是否注册
4. 校验用户密码是否正确
5. 保存用户的登录态(session)
6. 返回脱敏的用户信息

## 4.3 用户管理功能

接口设计必须要鉴权

判断登录用户是否是管理员身份，故应该在原表的基础上添加一个userRole字段  userRole   普通用户 0  管理员  1

### 4.3.1 查询用户功能

管理员身份可以查询非删除的用户。

传递参数： 用户名

对传递的参数进行非空校验

鉴权主要是查看session中存入的用户的userRole字段是否是1。

### 4.3.2 删除用户功能

根据用户id删除用户。

传递参数：用户id

对传递的参数进行校验

### 4.3.3 获取当前登录用户信息

从session中获取用户信息，

## 4.4 退出登录功能

用户退出登录，需要清除用户的登录态。

# 五，功能优化

## 5.1 用户校验优化

用户在注册时，需填写学号进行注册，已经注册过的学号不能重复使用。

学号长度固定为：2152500xxx 10位。

后端进行长度和唯一校验。

前端添加学号输入框。

向数据库数据添加一个字段：studentId  varchar(256)  非空。

展示列表中多添加展示学号。

## 5.2 通用反馈对象

在之前的代码中，我们返回都是直接返回数据，对于异常也是返回-1，这对前端非常不友好。

故要封装返回对象。

格式：

~~~json
//成功
{
    "code":"状态码",
    "data":"result",
    "messae":"ok"
}
//失败
{
    "code":"状态码",
    "data":"result",
    "messae":"用户操作异常，xxx"
}
~~~

告诉前端请求在业务上是否成功和失败

注意：通用返回对象的泛型中必须是包装类类型。

## 5.3 封装全局异常处理

对应异常情况，我们之前都是直接返回-1，这是不清楚的。

故应定义一个枚举类，罗列我们的异常情况。

但是我们需要在controller层和service层都要针对异常，进行返回错误信息，比较麻烦。

使用spring的全局异常处理器，

1. 可以自定义一个全局异常处理类。继承RuntimeException，自定义构造函数，设置自定义的信息。
2. 编写全局异常处理器，捕获代码中的所有异常，内部消化，集中处理，让前端获取到更详细的业务报错。

# 六，项目部署

## 6.1 多环境

完整开发的流程，分为：开发环境，测试环境，预发布环境(体验服)，生产环境。

本地开发：localhost

在不同的环境，需要有不同的配置（数据库，redis，地址）

## 6.2 前端多环境实战

- 请求地址
  - 开发环境：localhost
  - 线上环境：user-center.cn
  - umi框架用start启动项目，`process.env.NODE_ENV`传入的值为development，用build传入的值为production。

前端项目打包：npm run build 

打包生成的文件：dist ，执行打包的文件可以使用命令：npm run serve  该命令需要安装：npm install serve

前端可以通过`process.env.NODE_ENV`变量来改变环境。

开发环境：development，线上环境：production。

可以通过配置文件的后缀来指定环境：config.dev.ts  config.prod.ts

## 6.3 后端多环境

增加一个配置文件：application.prod.yml，在其中将数据库连接修改为远程数据库。

执行打包命令。

执行打包后的文件：

~~~
java -jar xxxx.jar --spring.profiles.active=prod
~~~

主要是改数据库地址，缓存地址，消息队列地址，项目端口号

## 6.4 原生方式进行部署

#### 1. 后端部署

购买腾讯轻量云服务器，

下载maven，jdk8，将本地打好的jar包上传到服务器某文件夹下，

注意：防火墙要放行8080端口，

执行命令：

````
nohup java -jar ./user-center-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod &
````

nohup让项目在后台运行。

#### 2. 前端部署

安装Nginx服务器，配置Nginx.conf文件，注意Nginx的权限，body root

## 6.5 宝塔部署

Linux运维面板
官方安装教程：https:/www.bt.cn/new/download.html
方便管理服务器、方便安装软件

在软件商店中安装Nginx，Tomcat，安装Tomcat是为了安装jdk8，SpringBoot已经内置了tomcat，

还有，JAVA项目一键部署。

**前端部署**

将我们打包好的前端文件上传到：/www/wwwroot/ 下，到网站选项的PHP项目下，添加站点，

输入域名，然后直接启动。我们在配置NGINX时，注意刷新页面，要让NGINX重新可以找到页面

一定要添加如下配置：

~~~nginx
//  刷新页面,会尝试查找静态页面
location / {
        try_files $uri /index.html;
    }
~~~



**后端部署**

到java项目下，添加JAVA项目，指定我们上传的jar包的位置，一般是：/www/wwwroot/ 下，

填写配置信息，然后就可以一键启动了。

## 6.6 绑定域名

前端项目访问流程：用户输入网址=>域名解析服务器（把网址解析为p地址/交给其他的域名解析服务）=>服务器=

(防火墙)=>ngix接收请求，找到对应的文件，返回文件给前端=>前端加载文件到浏览器中(js、css)=>渲染页
面
后端项目访问流程：用户输入网址=>域名解析服务器=>服务器=>gx接收请求=>后端项目（比如8080端口）
nginx反向代理的作用：替服务器接收请求，转发请求

## 6.7 跨域问题

浏览器为了用户的安全，仅允许向同域名、同端口的服务器发送请求。
如何解决跨域？
最直接的方式：把域名、端口改成相同的

添加跨域头

让服务器告诉浏览器：允许跨域（返回cross-origin-allow响应头）

**网关支持（Nginx）**

~~~nginx
# 跨域配置
location ^~ /api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    add_header 'Access-Control-Allow-Origin' $http_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers '*';
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Origin' $http_origin;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
}

~~~

**修改后端服务**

1. 配置@CrossOrigin注解
2. 添加web全局请求拦截器

~~~java
@Configuration
public class WebMvcConfg implements WebMvcConfigurer {
 
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //设置允许跨域的路径
        registry.addMapping("/**")
                //设置允许跨域请求的域名
                //当 **Credentials为true时，** Origin不能为星号，需为具体的ip地址【如果接口不带cookie,ip无需设成具体ip】
                .allowedOrigins("http://localhost:9527", "http://127.0.0.1:9527", "http://127.0.0.1:8082", "http://127.0.0.1:8083")
                //是否允许证书 不再默认开启
                .allowCredentials(true)
                //设置允许的方法
                .allowedMethods("*")
                //跨域允许时间
                .maxAge(3600);
    }
}


~~~

定义新的corsFilterBean,参考：https:/www.jianshu.com/p/b02099a435bd

# 7，项目优化

登录：单点登录，（redis）

数据展示：多条件查询，修改bug。

管理员可以将普通用户的账号进行封号处理，被封号了，无法登录。
