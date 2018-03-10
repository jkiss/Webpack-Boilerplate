# 2018 ofo 品牌推广项目

> 非React框架，沿用Webpack打包，用于制作简单的页面

### 页面点赞统计页面映射：

```javascript
{
    'page1' -> 你我新时代,
    'page2' -> 亲民外交,
    'page3' -> 宁德治吏,
    'page4' -> 马上就办
}
```

### 遇到的一些技术问题总结：

> 组件文件夹结构采用DDD思想

1. src/ 业务文件夹目录结构：
```javascript
├── fonts
│   
├── html
│   ├── page1.ejs
│   ├── page2.ejs
│   └── partials
├── images
│   ├── circle.png  // 外层图片由组件应用，hash命名
│   ├── copy        // copy文件夹下面的图片会直接复制到 build/images 下面
│
├── modules         // 通用组件
│   ├── components
│   └── utils
├── pages              // 业务组件
│   ├── about          // page 1
│   │   ├── about.styl
│   │   └── index.js
│   └── home           // page 2
│       ├── home.styl
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
    public_path: '/event/2018/article'

    // multi-pages
    ,page1:{ // 你我新时代
        title: '你我的新时代：全面小康一个都不能少'
        ,desc: 'China\'s new era in which \'no one must be left behind\''
        ,image: ''
        ,url: 'https://news.cgtn.com/event/2018/index.html'
        ,thumb: ''
    }
    ,page2:{
        title: 'Ten most used words in Premier Li Keqiang\'s government work report in recent years'
        ,desc: 'Terms such as &quot;development&quot;, &quot;economy&quot;, &quot;new&quot; and &quot;rural&quot; have become the most frequently mentioned words in the work reports during Two Sessions since 2013.'
        ,image: ''
        ,url: 'https://news.cgtn.com/event/TwoSessions2018/index.html'
        ,thumb: ''
    }
}
```
