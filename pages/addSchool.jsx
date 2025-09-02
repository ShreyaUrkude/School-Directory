
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const imageWatch = watch('image');

  useEffect(() => {
    if (imageWatch && imageWatch[0]) {
      const url = URL.createObjectURL(imageWatch[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [imageWatch]);

  const onSubmit = async (data) => {
    setMsg('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('address', data.address || '');
      fd.append('city', data.city);
      fd.append('state', data.state || '');
      fd.append('contact', data.contact);
      fd.append('email_id', data.email_id);
      fd.append('image', data.image[0]);

      const res = await axios.post('/api/schools', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        setMsg('School saved successfully!');
        reset();
        setPreview(null);
      } else {
        setMsg(res.data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.error || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 30px auto;
          padding: 2px;
          font-family: Arial, sans-serif;
          background: #e0f7fa;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }
        h1 {
          text-align: center;
          margin-bottom: 25px;
          color: #00796b;
          font-size: 1.8rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 25px;
        }
        .form-grid > div {
          display: flex;
          flex-direction: column;
        }
        .form-grid > div[style*='gridColumn'] {
          grid-column: 1 / -1 !important;
        }
        label {
          font-weight: bold;
          margin-bottom: 4px;
          color: #004d40;
          font-size: 0.9rem;
        }
        input,
        textarea {
          padding: 6px 8px;
          font-size: 13px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 6px;
        }
        input:focus,
        textarea:focus {
          border-color: #00796b;
          outline: none;
        }
        .btn {
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          width: 160px;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .btn-muted {
          background: #ddd;
          color: #333;
        }
        .btn-muted:hover {
          background: #ccc;
        }
        .btn-primary {
          background: #00796b;
          color: white;
        }
        .btn-primary:hover {
          background: #004d40;
        }
        .preview {
          margin-top: 6px;
          max-height: 100px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .view-btn {
          display: block;
          margin: 20px auto 0;
          padding: 10px 18px;
          width:130px;
          font-weight: bold;
          text-decoration: none;
          border-radius: 6px;
          background-color: lightgreen;
          color: white;
          text-align: center;
          transition: background 0.3s ease;
        }
        .view-btn:hover {
          background-color: #2e7d32;
        }
      
        .file-label {
          font-size: 0.75rem;
          margin-bottom: 2px;
          font-weight: 500;
        }
        .file-input {
          font-size: 0.8rem;
          padding: 4px 6px;
          border-radius: 4px;
          border: 1px solid #ccc;
          max-width: 200px;
        }
        @media (max-width: 500px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .btn,
          .view-btn {
            width: 100%;
          }
          .file-input {
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <h1>ADD SCHOOL</h1>
        <form className="form-grid" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>School Name :</label>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Example High School"
            />
            {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name.message}</p>}
          </div>

          <div>
            <label>Contact Number :</label>
            <input
              {...register('contact', {
                required: 'Contact is required',
                pattern: {
                  value: /^[0-9+ -]{6,20}$/,
                  message: 'Invalid contact number',
                },
              })}
              placeholder="+91 9876543210"
            />
            {errors.contact && <p style={{ color: 'red', fontSize: '12px' }}>{errors.contact.message}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Address :</label>
            <textarea {...register('address')} rows={2} placeholder="Street, area" />
          </div>

          <div>
            <label>City :</label>
            <input {...register('city', { required: 'City is required' })} />
            {errors.city && <p style={{ color: 'red', fontSize: '12px' }}>{errors.city.message}</p>}
          </div>

          <div>
            <label>State :</label>
            <input {...register('state')} />
          </div>

          <div>
            <label>Email :</label>
            <input
              {...register('email_id', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email',
                },
              })}
            />
            {errors.email_id && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email_id.message}</p>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label className="file-label">School Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: 'Image is required' })}
              className="file-input"
            />
            {errors.image && <p style={{ color: 'red', fontSize: '12px' }}>{errors.image.message}</p>}
            {preview && <img src={preview} alt="preview" className="preview" />}
          </div>

          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              gap: 10,
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              className="btn btn-muted"
              onClick={() => {
                reset();
                setPreview(null);
                setMsg('');
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save School'}
            </button>
          </div>

          {msg && (
            <p
              style={{
                gridColumn: '1 / -1',
                color: msg.includes('success') ? 'green' : 'red',
                fontSize: '13px',
              }}
            >
              {msg}
            </p>
          )}
        </form>

       
        <a href="/showSchools" className="view-btn">
          View Schools
        </a>
      </div>
    </>
  );
}
