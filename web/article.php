<?php
require_once 'lib.php';

// 获取url中的path参数
$path = isset($_GET['path']) ? $_GET['path'] : '';

// 定义base_path
$markdown_file = '../src/components/zx-' . $path . '/README.md';

// 检查文件是否存在
if (!file_exists($markdown_file)) {
    echo '文件: '.$markdown_file.' 不存在';
    exit;
}
// 读取 Markdown 文件
$markdown = file_get_contents($markdown_file);

// 使用parsedown 解析 Markdown 内容
$Parsedown = new Parsedown();
$article_content = $Parsedown->text($markdown);
// 当前日期
$current_date = date('Y-m-d');
// 定义页面数据
$pageArr = [
    "title"=>'zxUI - 跨平台UI框架，提供了300+组件、布局及界面库',
    "description"=>'zxUI是一套基于uni-app开发的跨平台UI框架，提供了丰富的组件、布局及界面库。它能够显著提升您的前端开发效率，实现一套代码多端发布。支持iOS、Android、H5、微信小程序等14个平台。',
    "keywords"=>'zxUI, uni-app UI框架, 跨平台开发UI框架',
    "day"=>$current_date,
    "content"=>$article_content,
];

// 输出最终的HTML文件
echo Lib::parseHtml('article', $pageArr);

