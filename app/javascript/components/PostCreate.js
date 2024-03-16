import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostCreate = (props) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");  

  const postData = async () => {
    if (title === '' || comment === '') {
      setError('タイトル、または、コメントが未入力です。')
    } else {
      setError('')
    }

    const res = await axios.post(
      "http://localhost:3000/posts",
      { "title": title, "content": comment },
      {"headers": {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      }
    )
    console.log("============", JSON.stringify(res))
  }

  useEffect(() => {
    setPosts(props.posts);
  }, [])

  return (
    <React.Fragment>
      <h3>Title</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <h3>Comment</h3>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />

      <button onClick={() => postData()}>postボタン</button>
      <p style='color: red;'>{error}</p>
    </React.Fragment>
  )
}

export default PostCreate
