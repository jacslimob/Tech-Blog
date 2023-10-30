var modal = document.getElementById('commentModal');
var btn = document.getElementById('myCommentBtn');

btn.onclick = function() {
  modal.style.display = "block";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const newComment = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment-body').value.trim();
    const postId = document.querySelector('#postId').value.trim();
  
    if (body && postId) {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ body, postId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  document
  .querySelector('.form-comment')
  .addEventListener('submit', newComment);