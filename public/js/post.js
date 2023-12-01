//refactored from mini project
const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();

  if (content && post_id) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
      alert('added new comment');
    } else {
      alert('Failed to add comment');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();

  const commentId = event.target.getAttribute('data-id');
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/');
    alert('post deleted');
  } else {
    alert('Failed to delete post');
  }
};

const updateButtonHandler = async (event) => {
  event.preventDefault();

  const post_id = event.target.getAttribute('update-id');
  const name = document.querySelector('#post-name-update').value.trim();
  const desc = document.querySelector('#post-desc-update').value.trim();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, desc }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/post/${post_id}`);
    alert('post updated');
  } else {
    alert('Failed to update post');
  }
}

//new comment btn
document
  .querySelector('.postBtn')
  .addEventListener('click', newFormHandler);

//delete post and comment button
document
  .querySelector('.deleteBtn')
  .forEach(btn =>btn.addEventListener('click', delButtonHandler));

//update post and comment button
document
  .querySelector('.updateBtn')
  .forEach(btn => btn.addEventListener('click', updateButtonHandler));