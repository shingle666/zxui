<?php
require_once 'lib.php';

// 页面数据
$pageArr = [
    "title"=>"zxUI - 跨平台UI框架，提供了300+组件、布局及界面库",
    "description"=>"zxUI是一套基于uni-app开发的跨平台UI框架，提供了丰富的组件、布局及界面库。它能够显著提升您的前端开发效率，实现一套代码多端发布。支持iOS、Android、H5、微信小程序等14个平台。",
    "keywords"=>"zxUI, uni-app UI框架, 跨平台开发UI框架",
    "time"=>date('Y-m-d H:i:s'),
];

// 输出最终的HTML文件
echo Lib::parseHtml('index', $pageArr);