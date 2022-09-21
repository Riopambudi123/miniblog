import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ArticleCreate() {
  // Data
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState({});
  // Form Data
  const [articleId, setArticleId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [validation, setValidation] = useState("");
  // token
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
        getArticles(response.data.id);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  };

  const getArticles = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/my-articles/${id}`
      );
      setArticles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const storeArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    await axios
      .post("http://127.0.0.1:8000/api/articles", formData)
      .then(() => {
        getArticles(user.id);
        setTitle("");
        setBody("");
        setValidation("");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  const editArticle = async (id) => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/articles/${id}`
    );
    setArticleId(response.data.data.id);
    setTitle(response.data.data.title);
    setBody(response.data.data.body);
  };

  const updateArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    await axios
      .put(`http://127.0.0.1:8000/api/articles/${articleId}`, {
        title: title,
        body: body,
      })
      .then(() => {
        getArticles(user.id);
        setArticleId("");
        setTitle("");
        setBody("");
        setValidation("");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  const deleteArticle = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/articles/${id}`);
    getArticles(user.id);
  };

  return (
    <div className="container py-4">
      <Link to="/home" className="btn btn-danger mb-3">
        Kembali
      </Link>
      <h1>Tambah Artikel</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Form</div>
            <div className="card-body">
              {articleId ? (
                <form onSubmit={updateArticle}>
                  <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="masukan judul artikel"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    {validation.title && (
                      <small className="text-danger">
                        {validation.title[0]}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Konten</label>
                    <textarea
                      className="form-control"
                      placeholder="Masukkan konten artikel"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {validation.body && (
                      <small className="text-danger">
                        {validation.body[0]}
                      </small>
                    )}
                  </div>
                  <button type="submit" className="btn btn-warning">
                    Update
                  </button>
                </form>
              ) : (
                <form onSubmit={storeArticle}>
                  <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="masukan judul artikel"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    {validation.title && (
                      <small className="text-danger">
                        {validation.title[0]}
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Konten</label>
                    <textarea
                      className="form-control"
                      placeholder="Masukkan konten artikel"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {validation.body && (
                      <small className="text-danger">
                        {validation.body[0]}
                      </small>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Artikel Saya</div>
            <div className="card-body">
              {articles.map((item, index) => (
                <div className="mb-3" key={item.id}>
                  <Link to={`/article/${item.id}`} className="text-primary">
                    <h6>{item.title}</h6>
                  </Link>
                  <div>
                    <small>{item.author}</small>
                    <small>-</small>
                    <small>{item.created_at}</small>
                  </div>
                  <p>{item.body}</p>
                  <div>
                    <button
                      type="button"
                      onClick={() => editArticle(item.id)}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteArticle(item.id)}
                      className="btn btn-sm btn-danger me-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCreate;
