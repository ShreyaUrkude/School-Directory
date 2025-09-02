
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchools();
  }, []);

  async function fetchSchools() {
    try {
      const res = await axios.get('/api/schools');
      setSchools(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 30px auto;
          padding: 0 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 1.8rem;
          color: #333;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 14px rgba(0,0,0,0.15);
        }
        .card img {
          width: 100%;
          height: auto;
          max-height: 180px;
          object-fit: contain; 
          display: block;
          margin: 0 auto;
        }
        .card-body {
          padding: 10px 12px;
        }
        .card-title {
          font-size: 1rem;
          margin: 0 0 4px 0;
          color: #0070f3;
        }
        .card-sub {
          font-size: 0.85rem;
          margin: 2px 0;
          color: #555;
        }
        .add-btn {
          display: inline-block;
          margin: 20px auto 0 auto;
          padding: 10px 25px;
          background-color: #28a745;
          color: white;
          font-weight: bold;
          border-radius: 6px;
          text-decoration: none;
          text-align: center;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .add-btn:hover {
          background-color: #1e7e34;
          transform: translateY(-2px);
        }
        @media (max-width: 500px) {
          .card img {
            max-height: 120px;
          }
          .add-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <h1>Schools</h1>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <>
            {schools.length === 0 && (
              <p style={{ textAlign: 'center' }}>No schools found.</p>
            )}
            <div className="grid">
              {schools.map((s) => (
                <div className="card" key={s.id}>
                  <img
                    src={s.image ? `/schoolImages/${s.image}` : '/placeholder.png'}
                    alt={s.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{s.name}</h3>
                    <p className="card-sub">{s.address}</p>
                    <p className="card-sub">{s.city}, {s.state}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: 'center' }}>
          <a href="/addSchool" className="add-btn">Add New School</a>
        </div>
      </div>
    </>
  );
}
