<?php

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}
if (file_exists(__DIR__ . '/../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../vendor/autoload.php';
}


/** 载入配置支持 */
// if (!file_exists(__DIR__ . '/.env')) {
//     file_exists('./install.php') ? header('Location: install.php') : print ('Missing Config File');
//     exit;
// }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app" class="container">
        <div>
            <h2>加密/解密</h2>
            <ul>
                <li>md5</li>
            </ul>
        </div>
        <div>
            <h2>代码压缩/格式化</h2>
            <ul>
                <li>HTML</li>
            </ul>
        </div>
        <div>
            <h2>文件转换</h2>
            <ul>
                <li>md2html</li>
            </ul>
        </div>
        <div>
            <h2>数据提取</h2>
            <ul>
                <li>site-info</li>
            </ul>
        </div>
        <div>
            <h2>数据可视化</h2>
            <ul>
                <li>echarts</li>
            </ul>
        </div>
    </div>
</body>

</html>