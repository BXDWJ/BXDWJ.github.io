// 页面加载时显示留言列表
window.onload = function() {
    displayMessages();
};

// 表单提交事件
document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const content = document.getElementById('content').value;
    
    // 创建留言对象
    const message = {
        id: Date.now(),
        name: name,
        email: email,
        content: content,
        date: new Date().toLocaleString()
    };
    
    // 从本地存储获取现有留言
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    // 添加新留言
    messages.push(message);
    
    // 保存到本地存储
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // 清空表单
    document.getElementById('messageForm').reset();
    
    // 更新留言列表
    displayMessages();
    
    // 显示成功提示
    alert('留言提交成功！');
});

// 显示留言列表
function displayMessages() {
    const messageList = document.getElementById('messageList');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    
    // 清空留言列表
    messageList.innerHTML = '<h3>留言列表</h3>';
    
    // 如果没有留言，显示提示
    if (messages.length === 0) {
        messageList.innerHTML += '<p>暂无留言</p>';
        return;
    }
    
    // 遍历留言并添加到列表
    messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <p>${message.content}</p>
            <p class="date">${message.date}</p>
        `;
        messageList.appendChild(messageItem);
    });
}

// 返回上一页按钮事件
document.getElementById('backBtn').addEventListener('click', function() {
    // 优先使用浏览器的历史记录返回上一页
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 如果没有历史记录，默认返回动漫.html
        window.location.href = '../../动漫.html';
    }
});

// 清除缓存按钮事件
document.getElementById('clearCacheBtn').addEventListener('click', function() {
    if (confirm('确定要清除所有留言缓存吗？此操作不可恢复。')) {
        localStorage.removeItem('messages');
        displayMessages();
        alert('缓存已清除！');
    }
});