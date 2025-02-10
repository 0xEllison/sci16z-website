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

// 添加清除筛选按钮的事件监听
document.addEventListener('DOMContentLoaded', () => {
  fetchTweets();
  
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