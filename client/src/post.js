import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/detailPost/${_id}`}>
          <img
            src={"http://localhost:5000/" + cover}
            alt="Description of the image"
          ></img>
        </Link>
      </div>
      <div className="text">
        <Link to={`/detailPost/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
