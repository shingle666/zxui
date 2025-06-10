const fs = require('fs');
const path = require('path');

/**
 * 递归删除目录
 * @param {string} dirPath 目录路径
 */
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        removeDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log(`已删除目录: ${dirPath}`);
  }
}

/**
 * 查找并删除嵌套的node_modules目录
 * @param {string} dirPath 搜索目录
 * @param {number} depth 当前深度
 */
function findAndRemoveNestedNodeModules(dirPath, depth = 0) {
  if (!fs.existsSync(dirPath) || depth > 10) {
    return;
  }

  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // 如果是node_modules或node-modules目录且不在项目根目录
          if ((file === 'node_modules' || file === 'node-modules') && depth > 0) {
            console.log(`发现嵌套的${file}: ${filePath}`);
            removeDir(filePath);
          } else if (file !== 'node_modules' && file !== 'node-modules') {
            // 递归搜索其他目录，但跳过根目录的node_modules和node-modules
            findAndRemoveNestedNodeModules(filePath, depth + 1);
          }
        }
      } catch (error) {
        console.warn(`无法访问文件: ${filePath}, 错误: ${error.message}`);
      }
    });
  } catch (error) {
    console.warn(`无法读取目录: ${dirPath}, 错误: ${error.message}`);
  }
}

// 主函数
function main() {
  console.log('开始清理嵌套的node_modules目录...');
  
  const projectRoot = process.cwd();
  console.log(`项目根目录: ${projectRoot}`);
  
  // 专门清理dist/dev/mp-weixin和dist/build/mp-weixin目录下的嵌套node_modules
  const targetDirs = [
    'dist/dev/mp-weixin',
    'dist/build/mp-weixin'
  ];
  
  targetDirs.forEach(dir => {
    const dirPath = path.join(projectRoot, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`清理${dir}目录下的嵌套node_modules...`);
      findAndRemoveNestedNodeModules(dirPath);
    } else {
      console.log(`目录不存在: ${dirPath}`);
    }
  });
  
  console.log('清理完成!');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { main, findAndRemoveNestedNodeModules, removeDir };