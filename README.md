# Webpack 打包模版

> 非React框架，沿用Webpack打包，用于制作简单的页面，例如H5单页
> 

1. src/ 业务文件夹目录结构：
```javascript
├── app                // code from here
│   ├── fonts
│   │   ├── css.styl
│   │   └── index.js
│   ├── media          // meida resource
│   │   ├── css.styl
│   │   └── index.js
│   ├── index.ejs      // html temolate
│   ├── index.js       // main js file
│   └── css.styl       // main css file
├── modules             // common files
│   ├── res/
│   ├── style/
│   └── utils/
└── vendor
    ├── copy/           // copy to build/vendor directly
    └── SplitText.min.js
```

2. webpack/ 打包配置目录：
```javascript
├── entry.js
├── optimization.js
├── loaders.js
├── plugins.js
├── resolve.js
└── rules.js
```

3. config.js 文件：
```javascript
// webpack发布路径，以及其他一些分享信息，统一配置
{
    // Deploy
    public_path: 'webpack发布路径'
    ,port: 8686
    ,plugin_url: 'https://some.com'
    ,ga_id: 'UA-????'
    ,fb_id: '123456789'
    ,analyse_bundle: false
    ,image_min: true

    // multi-pages
    ,page:{   // 你我新时代
        title: '标题'
        ,desc: '描述'
        ,image: '预览图'
        ,url: 'html页面完整url'
        ,thumb: '微信分享方图'
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
