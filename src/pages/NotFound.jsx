import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <Link to='/'>Go to Home</Link>
    </div>
  );
}
