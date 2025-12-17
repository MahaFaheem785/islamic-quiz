import { useEffect, useState } from "react";
import axios from "axios";

export default function Results({ user }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/api/auth/results/${user.email}`)
      .then((res) => setResults(res.data))
      .catch(() => setError("Failed to load results"));
  }, [user]);

  if (error) return <h4 className="text-center mt-5">{error}</h4>;
  if (!results.length)
    return <h4 className="text-center mt-5">❌ No results yet</h4>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Quiz Results</h2>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{r.name}</td>
              <td>{r.category}</td>
              <td>{r.score} / {r.total}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
