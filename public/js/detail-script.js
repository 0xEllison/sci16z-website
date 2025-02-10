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
      new Date(tweetData.created_at).toLocaleDateString('zh-CN');
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
    
    // 提取标题和内容
    const textWithoutTags = tweetData.text.replace(/#[\w\u4e00-\u9fa5]+/g, '').trim();
    const firstLineBreak = textWithoutTags.indexOf('\n');
    const title = firstLineBreak > -1 ? 
      textWithoutTags.slice(0, firstLineBreak) : 
      textWithoutTags;
    const content = firstLineBreak > -1 ? 
      textWithoutTags.slice(firstLineBreak + 1) : 
      '';

    // 填充文章内容
    document.querySelector('.article-title').textContent = title;
    document.querySelector('.article-text').textContent = content;
    
    // 生成相关资源
    const resourcesGrid = document.querySelector('.resources-grid');
    if (tweetData.resources) {
      tweetData.resources.forEach(resource => {
        const resourceCard = document.createElement('a');
        resourceCard.className = 'resource-card';
        resourceCard.href = resource.url;
        resourceCard.target = '_blank';
        resourceCard.innerHTML = `
          <h3>${resource.title}</h3>
          <p>${resource.description}</p>
        `;
        resourcesGrid.appendChild(resourceCard);
      });
    }
    
    // 生成讨论内容
    const discussionThread = document.querySelector('.discussion-thread');
    discussionThread.innerHTML = ''; // 清空现有讨论
    if (tweetData.authorReplies && tweetData.authorReplies.length > 0) {
      tweetData.authorReplies.forEach((reply, index) => {
        const discussionItem = document.createElement('div');
        discussionItem.className = 'discussion-item';
        discussionItem.innerHTML = `
          <div class="discussion-content">
            <div class="discussion-meta">
              <span class="discussion-author">SCI16Z</span>
              <span class="discussion-date">
                ${new Date(reply.created_at).toLocaleDateString('zh-CN')}
              </span>
            </div>
            <div class="discussion-text">${reply.text}</div>
          </div>
        `;
        discussionThread.appendChild(discussionItem);
      });
    } else {
      discussionThread.innerHTML = '<p class="no-discussion">暂无讨论</p>';
    }
    
  } catch (error) {
    console.error('Error fetching tweet detail:', error);
    document.querySelector('.article-content').innerHTML = 
      '<p class="error-message">内容未找到</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchTweetDetail); 