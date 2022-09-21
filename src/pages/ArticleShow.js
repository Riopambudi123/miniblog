import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ArticleShow() {
  const { articleId } = useParams();
  const [user, setUser] = useState({});
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  // Form
  const [body, setBody] = useState("");
  const [validation, setValidation] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post("http://127.0.0.1:8000/api/auth/me")
      .then((response) => {
        setUser(response.data);
        getArticle();
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  const getArticle = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/articles/${articleId}`
    );
    setArticle(response.data.data);
    setComments(response.data.data.comments);
    console.log(response.data.data.comments);
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("body", body);

    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    await axios
      .post(
        `http://127.0.0.1:8000/api/article-comment/${articleId}`,
        formData,
        config
      )
      .then(() => {
        getArticle();
        setBody("");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="container py-4">
      <Link to="/articles" className="btn btn-danger mb-3">
        Kembali
      </Link>
      <h1>{article.title}</h1>
      <div>
        <small>{article.author}</small>
        <small>-</small>
        <small>{article.created_at}</small>
        <small>-</small>
        <small>{article.total_comments} Komentar</small>
      </div>
      <p>{article.body}</p>
      <hr />
      <form onSubmit={commentHandler} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Masukkan konten artikel"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {validation.body && (
            <small className="text-danger">{validation.body[0]}</small>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {comments.map((item, index) => (
        <div className="mb-3" key={item.id}>
          <h6>{item.author}</h6>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default ArticleShow;
