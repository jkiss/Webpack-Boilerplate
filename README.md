# Webpack 打包模版

> 非React框架，沿用Webpack打包，用于制作简单的页面
> 
> 组件文件夹结构采用DDD(Domain Drive Design)方式

1. src/ 业务文件夹目录结构：
```javascript
├── fonts
│   
├── html
│   ├── page1.ejs
│   ├── page2.ejs
│   └── partials
├── images
│   ├── circle.png  // 外层图片由组件import使用
│   ├── copy        // copy文件夹下面的图片会直接复制到 build/images 下面
│
├── modules         // 通用组件
│   ├── components
│   └── utils
├── pages              // 业务组件
│   ├── about          // page 1
│   │   ├── css.styl
│   │   └── index.js
│   └── home           // page 2
│       ├── css.styl
│       └── index.js
├── styles             // 通用样式模块
│   ├── nk-player.styl
│   └── utils
└── vendor
    ├── SplitText.min.js
    └── jwplayer7.12.11.js
```

2. webpack/ 打包配置目录：
```javascript
├── entry.js    // 配置js入口文件
├── loaders.js
├── plugins.js  // 新建html页面需要配置 htmlWebpackPlugin
└── resolve.js
```

3. config.js 文件：
```javascript
// webpack发布路径，以及其他一些分享信息，统一配置
{
    // Deploy
    public_path: 'webpack发布路径'

    // multi-pages
    ,page1:{   // 你我新时代
        title: '标题'
        ,desc: '描述'
        ,image: '预览图'
        ,url: 'html页面完整url'
        ,thumb: '微信分享方图'
    }
    ,page2:{
        title: ''
        ,desc: ''
        ,image: ''
        ,url: ''
        ,thumb: ''
    }
}
```
