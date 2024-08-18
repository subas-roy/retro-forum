const loadPosts = async() => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await response.json();
  const posts = data.posts;
  displayPosts(posts)
  // console.log(posts)
}
loadPosts()

const displayPosts = (posts) => {
  const postContainer = document.getElementById('post-container');
  posts.forEach(post => {
    console.log(post)
    const postCard = document.createElement('div');
    postCard.classList = 'flex gap-6 bg-[#F3F3F5] rounded-2xl p-8';
    postCard.innerHTML = `
      <div>
          <img height="72px" width="72px" src="${post.image}" alt="">
        </div>
        <div class="meta flex flex-col gap-2">
          <p class="inter font-medium text-sm"><span>#${post.category}</span> <span>Author: ${post.author.name}</span></p>
          <h4 class="font-bold text-xl">${post.title}</h4>
          <p class="inter font-normal">${post.description}</p>
          <hr>
          <div class="flex justify-between inter font-normal">
            <div class="flex gap-6">
              <div class="flex gap-3">
                <img src="images/chat.png" alt="">
                <span>${post.comment_count}</span>
              </div>
              <div class="flex gap-3">
                <img src="images/views.png" alt="">
                <span>${post.view_count}</span>
              </div>
              <div class="flex gap-3">
                <img src="images/timer.png" alt="">
                <span>${post.posted_time} min</span>
              </div>
            </div>
            <img src="images/email.png" alt="">
          </div>
        </div>
    `;
    // append child
    postContainer.appendChild(postCard)
  });
}