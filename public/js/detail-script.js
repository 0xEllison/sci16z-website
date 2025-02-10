async function fetchTweetDetail() {
  // 从 URL 中获取推文 ID
  const tweetId = window.location.pathname.split('/tweet/')[1];
  
  try {
    const response = await fetch(`/api/tweets/${tweetId}`);
    if (!response.ok) {
      throw new Error('Tweet not found');
    }
    
    const tweetData = await response.json();
    
    // 更新页面标题
    document.title = `${tweetData.text.slice(0, 50)}... - SCI16Z Knowledge Base`;
    
    // 填充文章元信息
    document.querySelector('.publish-date').textContent = 
      new Date(tweetData.created_at).toLocaleDateString('en-US');
    document.querySelector('.likes-count').textContent = tweetData.likes;
    document.querySelector('.views-count').textContent = tweetData.views;
    
    // 提取并显示标签
    const tags = tweetData.text.match(/#[\w\u4e00-\u9fa5]+/g) || [];
    const tagsContainer = document.querySelector('.tags');
    tagsContainer.innerHTML = ''; // 清空现有标签
    tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    // 设置文章内容（移除标签）
    const textWithoutTags = tweetData.text.replace(/#[\w\u4e00-\u9fa5]+/g, '').trim();
    document.querySelector('.article-text').textContent = textWithoutTags;
    document.querySelector('.article-title').textContent = textWithoutTags.slice(0, 100) + '...';
    
    // 显示相关资源
    if (tweetData.resources && tweetData.resources.length > 0) {
      const resourcesGrid = document.querySelector('.resources-grid');
      resourcesGrid.innerHTML = tweetData.resources.map(resource => `
        <a href="${resource.url}" target="_blank" class="resource-card">
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
        </a>
      `).join('');
    }
    
    // 显示讨论内容
    const discussionThread = document.querySelector('.discussion-thread');
    if (tweetData.authorReplies && tweetData.authorReplies.length > 0) {
      discussionThread.innerHTML = tweetData.authorReplies.map(reply => `
        <div class="discussion-item">
          <div class="discussion-meta">
            <span class="author-name">SCI16Z</span>
            <span class="reply-date">
              ${new Date(reply.created_at).toLocaleDateString('en-US')}
            </span>
          </div>
          <div class="discussion-text">${reply.text}</div>
        </div>
      `).join('');
    } else {
      discussionThread.innerHTML = '<p class="no-discussion">No discussions yet.</p>';
    }
    
  } catch (error) {
    console.error('Error fetching tweet detail:', error);
    document.querySelector('.article-content').innerHTML = 
      '<p class="error-message">Content not found</p>';
  }
}

// 页面加载完成后获取数据
document.addEventListener('DOMContentLoaded', fetchTweetDetail);

// 检查字体加载状态
document.fonts.ready.then(() => {
  // 字体加载完成后再显示内容
  document.body.style.opacity = '1';
}); 