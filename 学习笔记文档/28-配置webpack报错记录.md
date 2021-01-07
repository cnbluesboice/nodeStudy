### 配置webpack报错记录

使用最新版的的webpack/webpack-cli/webpack-dev-server会有兼容性问题，报错信息如下：

```
Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

官方还未解决，可以回退到如下版本：

```
"webpack": "^4.43.0",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.0"
```

