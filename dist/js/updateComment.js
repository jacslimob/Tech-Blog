const delButtonHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#post').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  
};

const updatePost = async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    const id = document.querySelector('#post').value.trim();

    if(title && content){
        const response = await fetch (`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok){
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
    
}

document.getElementById('update').addEventListener('click', updatePost);

document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);
