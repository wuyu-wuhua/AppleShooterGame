document.addEventListener('DOMContentLoaded', function() {
    // 评论表单提交
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const comment = document.getElementById('comment').value;
            
            if (username && comment) {
                addNewComment(username, comment);
                this.reset();
            }
        });
    }

    // 删除评论
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-comment')) {
            const comment = e.target.closest('.comment');
            if (comment) {
                comment.remove();
                updateTotalComments();
            }
        }
    });
});

// 添加新评论
function addNewComment(username, content) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;

    const comment = document.createElement('div');
    comment.className = 'comment';
    
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    
    comment.innerHTML = `
        <div class="comment-header">
            <span class="comment-username">${username}</span>
            <span class="comment-date">${date}</span>
        </div>
        <p class="comment-content">${content}</p>
        <button class="delete-comment">${languageData[getCurrentLanguage()].deleteComment}</button>
    `;
    
    commentsList.insertBefore(comment, commentsList.firstChild);
    updateTotalComments();
}

// 更新评论总数
function updateTotalComments() {
    const totalComments = document.querySelector('.total-comments');
    if (!totalComments) return;
    
    const comments = document.querySelectorAll('.comment');
    const count = comments.length;
    totalComments.textContent = `${languageData[getCurrentLanguage()].totalComments.split(':')[0]}: ${count} ${languageData[getCurrentLanguage()].totalComments.split(':')[1].split(' ')[2]}`;
} 