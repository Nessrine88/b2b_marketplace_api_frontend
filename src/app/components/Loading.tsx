import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-transparent">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div className="bubble" key={i}>
            {[...Array(5)].map((_, j) => (
              <span key={j}></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
