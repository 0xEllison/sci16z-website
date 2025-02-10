let allTweets = []; // 存储所有推文
let activeTag = null; // 当前选中的标签

async function fetchTweets() {
  try {
    const response = await fetch('/api/tweets');
    allTweets = await response.json();
    
    // 生成并显示标签列表
    generateTagsList();
    // 显示推文
    displayTweets(allTweets);
    
  } catch (error) {
    console.error('Error fetching tweets:', error);
    document.querySelector('.masonry').innerHTML = 
      '<p class="error-message">加载推文失败</p>';
  }
}

function generateTagsList() {
  // 收集所有标签及其出现次数
  const tagCounts = {};
  allTweets.forEach(tweet => {
    const tags = tweet.text.match(/#[\w\u4e00-\u9fa5]+/g) || [];
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // 生成标签列表
  const tagsList = document.querySelector('.tags-list');
  tagsList.innerHTML = '';
  
  Object.entries(tagCounts).forEach(([tag, count]) => {
    const tagButton = document.createElement('button');
    tagButton.className = 'tag-filter';
    tagButton.innerHTML = `
      ${tag}
      <span class="count">${count}</span>
    `;
    
    tagButton.addEventListener('click', () => filterByTag(tag));
    tagsList.appendChild(tagButton);
  });
}

function filterByTag(tag) {
  const clearFilterBtn = document.querySelector('.clear-filter');
  const tagButtons = document.querySelectorAll('.tag-filter');
  
  if (activeTag === tag) {
    // 取消筛选
    activeTag = null;
    clearFilterBtn.style.display = 'none';
    tagButtons.forEach(btn => btn.classList.remove('active'));
    displayTweets(allTweets);
  } else {
    // 应用新筛选
    activeTag = tag;
    clearFilterBtn.style.display = 'block';
    tagButtons.forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes(tag));
    });
    
    const filteredTweets = allTweets.filter(tweet => 
      tweet.text.includes(tag)
    );
    displayTweets(filteredTweets);
  }
}

function displayTweets(tweets) {
  const container = document.querySelector('.masonry');
  const template = document.getElementById('tweet-card-template');
  
  container.innerHTML = '';
  
  tweets.forEach((tweet, index) => {
    const card = template.content.cloneNode(true);
    const article = card.querySelector('article');
    
    // 添加延迟动画
    article.style.animationDelay = `${index * 0.1}s`;
    
    // 添加标签
    const tagsContainer = card.querySelector('.tweet-tags');
    const tags = tweet.text.match(/#[\w\u4e00-\u9fa5]+/g) || [];
    tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tweet-tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });
    
    // 设置推文内容（移除标签）
    const textWithoutTags = tweet.text.replace(/#[\w\u4e00-\u9fa5]+/g, '').trim();
    card.querySelector('.tweet-text').textContent = textWithoutTags;
    
    card.querySelector('.likes-count').textContent = tweet.likes;
    card.querySelector('.views-count').textContent = tweet.views;
    card.querySelector('.tweet-date').textContent = 
      new Date(tweet.created_at).toLocaleDateString('zh-CN');
    
    article.addEventListener('click', () => {
      window.location.href = `/tweet/${tweet.id}`;
    });
    
    container.appendChild(card);
  });
}

// 移动端菜单控制
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const filterContainer = document.querySelector('.tags-filter-container');
  const body = document.body;

  // 创建遮罩层
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  body.appendChild(overlay);

  // 打开菜单
  menuBtn.addEventListener('click', () => {
    filterContainer.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  });

  // 关闭菜单的函数
  const closeMenu = () => {
    filterContainer.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
  };

  // 点击遮罩层关闭
  overlay.addEventListener('click', closeMenu);

  // 点击标签后关闭菜单
  document.querySelectorAll('.tag-filter').forEach(tag => {
    tag.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
  fetchTweets();
  initMobileMenu();
  
  const clearFilterBtn = document.querySelector('.clear-filter');
  clearFilterBtn.addEventListener('click', () => {
    activeTag = null;
    clearFilterBtn.style.display = 'none';
    document.querySelectorAll('.tag-filter').forEach(btn => 
      btn.classList.remove('active')
    );
    displayTweets(allTweets);
  });
});

// 添加页面滚动时的渐入效果
function handleScroll() {
  const cards = document.querySelectorAll('.masonry-item');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchTweets();
  window.addEventListener('scroll', handleScroll);
});

// 检查字体加载状态
document.fonts.ready.then(() => {
  // 字体加载完成后再显示内容
  document.body.style.opacity = '1';
});

// AI 状态控制
const eras = [
  { name: 'Genesis Era', blocks: 1000 },
  { name: 'Ancient Era', blocks: 2000 },
  { name: 'Classical Era', blocks: 3000 },
  { name: 'Medieval Era', blocks: 4000 },
  { name: 'Renaissance Era', blocks: 5000 },
  { name: 'Industrial Era', blocks: 6000 },
  { name: 'Modern Era', blocks: 7000 },
  { name: 'Information Era', blocks: 8000 },
  { name: 'Quantum Era', blocks: 9000 },
  { name: 'Interstellar Era', blocks: 10000 }
];

function updateAIStatus() {
  // 更新论文处理数量
  const papersCount = document.getElementById('papers-count');
  const currentCount = parseInt(papersCount.textContent);
  const newCount = currentCount + Math.floor(Math.random() * 5);
  papersCount.textContent = newCount;

  // 更新知识块和纪元
  const knowledgeBlocks = document.getElementById('knowledge-blocks');
  const currentEra = document.getElementById('current-era');
  const progressFill = document.querySelector('.progress-fill');
  
  let currentBlocks = parseInt(knowledgeBlocks.textContent);
  currentBlocks += Math.floor(Math.random() * 3);

  // 查找当前纪元
  let eraIndex = 0;
  for (let i = 0; i < eras.length; i++) {
    if (currentBlocks < eras[i].blocks) {
      eraIndex = i;
      break;
    }
  }

  // 更新显示
  const era = eras[eraIndex];
  currentEra.textContent = era.name;
  
  // 计算到下一个纪元的进度
  const prevEraBlocks = eraIndex > 0 ? eras[eraIndex - 1].blocks : 0;
  const progressPercentage = ((currentBlocks - prevEraBlocks) / (era.blocks - prevEraBlocks)) * 100;
  
  progressFill.style.width = `${progressPercentage}%`;
  knowledgeBlocks.textContent = `${currentBlocks - prevEraBlocks}/${era.blocks - prevEraBlocks}`;
}

// 定期更新状态
setInterval(updateAIStatus, 3000);

// 初始化状态
document.addEventListener('DOMContentLoaded', () => {
  updateAIStatus();
}); 