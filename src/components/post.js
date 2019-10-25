import Button from './button.js';
import Input from './input.js';
import Textarea from './textarea.js';

function Post(props) {

  const commentsTemplate =  props.comments.map(comment => `<ul class="comments secondary-font">${comment.commentText}</ul>`).join('');

    return `
      <div class="post" data-id="${props.dataId}">
      <span class="post-username primary-font">${props.username}</span>
      <span class="post-date secondary-font">${props.date}</span>
      <span class="post-text secondary-font" id="${props.dataId}" >${props.text}</span>
        
        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onClick: window.post.deletePost,
          title: 'Deletar',
        })}

        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onClick: window.post.editPost,
          title: 'Editar',
        })}

        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onCick: window.post.saveEditPost,
          title: 'Salvar',
        })}
        <ol>
          <form>
            ${Input({
              id: 'comment1',
              class: 'comment-text secondary-font',
              placeholder: 'Insira seu comentário',
            })}

            ${Button({
              dataId: props.dataId,
              class: 'secondary-button primary-font',
              onClick: window.post.commentPost,
              title: 'Comentar',
            })}
          </form>
          ${commentsTemplate}
        </ol>  
      </div>
    `;
}

function deletePost(event) {
  const id = event.target.dataset.id;
  firebase.firestore().collection('post').doc(id).delete();
  event.target.parentElement.remove();
}

function editPost(event) {
  const id = event.target.dataset.id;
  const postText = document.getElementById(id);
  postText.setAttribute('contentEditable', 'true');
  postText.focus();
  postText.style.border = '1px solid #e37b40';
}

function saveEditPost(event) {
  const id = event.target.dataset.id;
  const saveText = document.getElementById(id);
  const newText = saveText.textContent;
  firebase.firestore().collection('post').doc(id).update({
    text: newText,
  });
  saveText.setAttribute('contentEditable', 'false');
  saveText.style.border = 'none';
}

function commentPost(event){
  const id = event.target.dataset.id;
  const commentText = document.querySelector('#comment1').value;
  event.target.insertAdjacentHTML('afterend', `<ul>${commentText}</ul>`)
  firebase.firestore().collection(`post/${id}/comments`).add({commentText});
  console.log(commentText)
}

window.post = {
  Textarea,
  deletePost,
  editPost,
  saveEditPost,
  commentPost,
};

export default Post;
