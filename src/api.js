function _fetch(url) {
  return fetch(url).then((response) => {
    return response.json();
  });
}

export function fetchPosts() {
  return _fetch(
    "https://json-server-posts-api.herokuapp.com/api/posts?_expand=user"
  );
}

export function fetchPost(postId) {
  return _fetch(
    `https://json-server-posts-api.herokuapp.com/api/posts/${postId}?_expand=user&_embed=comments`
  );
}

export function fetchCommentsForPost(postId) {
  return _fetch(
    `https://json-server-posts-api.herokuapp.com/api/posts/${postId}/comments`
  );
}

// POST /comments
export function saveComment(body, postId) {
  return fetch("https://json-server-posts-api.herokuapp.com/api/comments", {
    method: "POST",
    body: JSON.stringify({
      body: body, // text from textarea
      postId: postId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
