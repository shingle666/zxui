<?php
require_once 'vendor/autoload.php'; 

class Lib
{
    /**
     * 配置信息
     * @return array
     */
    static public function config()
    {
        return [
            "template_folder" => 'template',
            "site_logo" => '/logo.png',
            "site_icon" => '/favicon.ico',
            "site_name" => 'zxUI跨平台UI框架',
            "site_url" => 'https://zxui.org',
            "site_author" => 'tanzhenxing',
            "site_locale" => 'zh_CN',
            "site_copyright" => 'Copyright © 2023-2025 zxUI All Rights Reserved',
            "site_stats" => ''
        ];
    }

    /**
     * 解析HTML
     * @param string $file_path
     * @param array $data
     * @return string
     */
    static public function parseHtml($file_path, $data = [])
    {
        // 合并配置和页面数据
        $render_data = array_merge((array)self::config(), (array)$data);
        $current_template_folder = $render_data['template_folder'];

        $template_file = $current_template_folder.'/'.$file_path.'.html';
        $template_content = file_get_contents($template_file);
        // 替换模版中插入的文件
        $template_content = preg_replace_callback('/{{file=(.*?)}}/', function ($matches) use ($current_template_folder) {
            $file_to_include = trim($matches[1]);
            $sub_template_file = $current_template_folder.'/'.$file_to_include.'.html';
            return file_get_contents($sub_template_file);
        }, $template_content);

        // 替换模版中插入的变量
        if (!empty($render_data)) {
            foreach ($render_data as $key => $value) {
                // 确保替换的值是字符串或可以转换为字符串的对象
                if (is_scalar($value) || (is_object($value) && method_exists($value, '__toString'))) {
                    $template_content = str_replace('{{' . $key . '}}', (string)$value, $template_content);
                }
            }
        }

        return $template_content;
    }

    /**
     * 解析Markdown
     * @param string $content
     * @return string
     */
    function parseMarkdown($content)
    {
        // 使用parsedown 解析 Markdown 内容
        $Parsedown = new Parsedown();
        $html = $Parsedown->text($content);
        // 输出 HTML 内容
        return $html;
    }
}
