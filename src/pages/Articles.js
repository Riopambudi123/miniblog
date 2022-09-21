import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/articles");
      setArticles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-4">
      <Link to="/home" className="btn btn-danger mb-3">
        Kembali
      </Link>
      <h1>Articles</h1>
      <hr />
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
        </div>
      ))}
      {/* <div className="mb-3">
        <Link to="#" className="text-primary">
          <h6>Judul Pertama</h6>
        </Link>
        <div>
          <small>Rio Pambudi</small>
          <small>-</small>
          <small>12 Sep 2022</small>
        </div>
        <p>Ini adalah judul pertama</p>
      </div> */}
    </div>
  );
}

export default Articles;
