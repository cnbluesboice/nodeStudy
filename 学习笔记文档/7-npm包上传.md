## npm上传包

1. 创建一个文件夹

2. npm初始化，执行命令

   ```
   npm init
   ```

   

3. 初始化之后，在终端进行npm 包信息的设置，成功后生成package.json文件

   ```
   {
     "name": "nodefsmodule",
     "version": "1.0.0",
     "description": "chenling test npm package upload",
     "main": "npmPackage.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "repository": {
       "type": "git",
       "url": "git+https://github.com/cnbluesboice/nodeStudy.git"
     },
     "keywords": [
       "node",
       "fs"
     ],
     "author": "cnbluesboice",
     "license": "ISC",
     "bugs": {
       "url": "https://github.com/cnbluesboice/nodeStudy/issues"
     },
     "homepage": "https://github.com/cnbluesboice/nodeStudy#readme"
   }
   ```

   

4. 注册npm官网账号，需要邮箱验证

5. 验证成功后发布包

   ```
   npm publish
   ```

   

