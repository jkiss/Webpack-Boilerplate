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
├── media           // 包含图片、声音等资源文件
│   ├── circle.png  // 外层图片由组件import使用
│   ├── copy/       // copy文件夹下面的图片会直接复制到 build/images 下面
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
    ├── copy/          // copy文件夹下面的库会直接拷贝到 build/vendor 下面
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

### 三、集成的基础插件和功能插件：

   1. [**jquery**](https://jquery.com/): $ 已暴露为全局变量，可以引用jQuery插件；
   
   4. [**lodash**](https://lodash.com/)：js基础功能函数封装（utility library）；
   
   5. [**resource-loader**](http://englercj.github.io/resource-loader/)：具有丰富的图片懒加载方式；
   
   6. [**animejs**](https://animejs.com/documentation)：动画库；
   
   7. [**stylus**](http://stylus-lang.com/): TJ大神出品的css预编译语言，底层node；
   
   8. [**nib**](http://tj.github.io/nib/): 配合stylus的css3扩展函数；
