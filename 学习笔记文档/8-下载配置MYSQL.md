## 下载配置MYSQL

1. 官网下载MYSQL数据库，需要注册Oracle账号，安装时需要注意选择如下认证方式

   + MySQL下载链接地址：https://dev.mysql.com/downloads/
   + 选择MySql Community Server，下载想要的版本（注意安装：server-only）

   ![image-20201130105039284](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201130105039284.png)

2. 安装完成后在所有程序中找到 Mysql Command Line Client，验证数据库是否存在

   ```
   // 输入指令检查数据库
   show databases;
   ```

   出现如下图所示，即为数据库连接安装建立成功

   ![image-20201130111628567](C:\Users\87643\AppData\Roaming\Typora\typora-user-images\image-20201130111628567.png)

3. 安装Navicat数据库可视化工具

   破解版下载地址：https://www.cnblogs.com/yinfei/p/11427259.html

4. 可在Navicat中新建数据库，添加数据

5. 命令行操作数据库

   ```
   show databases;	// 输入指令检查数据库
   use 数据库名     // 选择进入数据库
   select * from 表名 // 选择数据库中某个表对应的所有信息（*表示查询所有信息）
   ```

   

6. 

   

