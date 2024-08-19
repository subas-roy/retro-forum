const loadPosts = async() => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await response.json();
  const posts = data.posts;
  displayPosts(posts)
  // console.log(posts)
}
loadPosts()

const loadPosts2 = async() => {
  const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await response.json();
  const posts = data;
  displayPosts2(posts)
  // console.log(posts)
}
loadPosts2()

const displayPosts = (posts) => {
  const postContainer = document.getElementById('post-container');
  postContainer.textContent = '';
  posts.forEach(post => {
    // console.log(post)
    const postCard = document.createElement('div');
    postCard.classList = 'flex gap-6 bg-[#F3F3F5] rounded-2xl p-8';
    postCard.innerHTML = `
      <div class="relative">
        <div class="dot active absolute top-[-5px] right-[-5px] bg-[${post.isActive? '#10B981' : '#FF3434'}]"></div>
        <img class="rounded-lg" height="72px" width="72px" src="${post.image}" alt="">
      </div>
      <div class="meta flex flex-col gap-2 w-full">
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
          <img class="read" onclick="handleMarkAsRead(event)" src="images/email.png" alt="">
        </div>
      </div>
    `;
    // append child
    postContainer.appendChild(postCard)
  });
}

const displayPosts2 = (posts) => {
  const postContainer = document.getElementById('latest-post-container');
  posts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.classList = 'card bg-base-100 w-96 shadow-xl';
    postCard.innerHTML = `
      <figure>
        <img
          src="${post.cover_image}"
          alt="Shoes" />
      </figure>
      <div class="card-body">
        <div class="flex gap-2 items-center">
          <div>
            <img src="images/date.png" alt="">
          </div>
          <p class="inter font-medium text-sm">${post.author?.posted_date? post.author.posted_date : 'No publish date'}</p>
        </div>
        <h2 class="card-title mulish font-extrabold text-lg">${post.title}</h2>
        <p>${post.description}</p>
        <div class="flex gap-3">
          <div>
            <img class="rounded-full" height="44px" width="44px" src="${post.profile_image}" alt="">
          </div>
          <div">
            <p class="font-bold">${post.author.name}</p>
            <p class="text-sm">${post.author.designation? post.author.designation : 'Unknown'}</p>
          </div>
        </div>
      </div>
    `;
    // append child
    postContainer.appendChild(postCard)
  });
}

let readCount = 0;
const handleMarkAsRead = (e) => {
  readCount++;
  const readCounter = document.getElementById('read-count');
  readCounter.innerText = readCount;
  const markAsReadContainer = document.getElementById('mark-as-read-container');
  const post = document.createElement('div');
  post.classList = 'flex bg-white p-4 rounded-2xl my-4 gap-4';
  post.innerHTML = `
    <div>
      <p class="mulish font-semibold">10 Kids Unaware of Their Halloween Costume</p>
    </div>
    <div class="flex gap-2 items-center">
      <div>
        <img src="images/views.png" alt="">
      </div>
      <span>500</span>
    </div>
  `;
  markAsReadContainer.appendChild(post);
}

// load posts
const loadPost = async(categoryName) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
  const data = await res.json();
  const posts = data.posts;
  console.log(posts)
  displayPosts(posts)
}

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPost(searchText)
}