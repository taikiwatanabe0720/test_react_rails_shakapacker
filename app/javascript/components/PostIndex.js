import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostIndex = (props) => {
  const [posts, setPosts] = useState([]);
  const [viewType, setViewType] = useState('index');

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/posts.json", {headers: {"content-type": "application/json"}})
    setPosts(res.data)
  }

  const postData = async () => {
    const res = await axios.post(
      "http://localhost:3000/posts",
      {"title": "aaaaa", "comment": "bbbbb"},
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
    console.log(props.posts);
  }, [])

  return (
    <React.Fragment>
      <div>
        <button onClick={() => fetchData()}>fetchボタン</button>
        <button onClick={() => postData()}>postボタン</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Comment</th>
              <th colSpan="3"></th>
            </tr>
          </thead>

          <tbody>
            { posts.map((post) => (
              <tr>
                <td>{post.title}</td>
                <td>{post.comment}</td>
                <td>{'Show'}</td>
                <td>{'Edit'}</td>
                <td>{'Destroy'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button onClick={() => setViewType('new')}>New Post</button>
        <p>aaa</p>
      </div>
    </React.Fragment>
  )
}

export default PostIndex