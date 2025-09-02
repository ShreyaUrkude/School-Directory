export default function Home() {
  return (
    <>
      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('https://i.pinimg.com/1200x/4a/0f/c6/4a0fc658b2c1afa81f32fba44a1182e3.jpg') 
                      no-repeat center center / cover;
          position: relative;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4); 
        }
        .container {
          position: relative;
          padding: 60px 50px;
          max-width: 400px;
          width: 90%;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 0.95); 
          font-family: Arial, sans-serif;
          text-align: center;
          color: #333;
          z-index: 1;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        h1 {
          font-size: 2.8rem; 
          margin-bottom: 40px;
          color: #0070f3;
        }
        .btn {
          display: inline-block;
          padding: 15px 30px;
          margin: 10px;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
          color: white;
          background-color: #0070f3;
          border-radius: 10px;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .btn:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }
        .btn:active {
          background-color: #004080;
          transform: translateY(0);
        }
        @media (max-width: 500px) {
          .container {
            padding: 40px 20px;
          }
          h1 {
            font-size: 2rem;
          }
          .btn {
            font-size: 16px;
            padding: 12px 20px;
            width: 100%;
            margin: 10px 0;
          }
        }
      `}</style>

      <div className="page">
        <div className="overlay"></div>
        <div className="container">
          <h1>School Directory</h1>
          <a href="/addSchool" className="btn">Add School</a>
          <a href="/showSchools" className="btn">Show Schools</a>
        </div>
      </div>
    </>
  );
}
