import { useEffect, useState } from 'react';
import PoseCard from './PoseCard';

const PoseList = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/poses')
      .then((res) => res.json())
      .then((data) => {
        setPoses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch poses:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading poses...</p>;

  return (
    <div className="pose-list">
      {poses.map((pose) => (
        <PoseCard key={pose._id} pose={pose} />
      ))}
    </div>
  );
};

export default PoseList;