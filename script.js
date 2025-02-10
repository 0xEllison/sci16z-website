// script.js

// 点击"开始修炼"按钮后滚动到对应区块
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // 顶部导航高度预留
        behavior: 'smooth'
      });
    }
  }
  
  // 其他待接入功能示例
  // 1. Telegram登录 -> 跳转 OAuth
  // 2. 钱包连接 -> 调用web3或wallet sdk
  // etc.