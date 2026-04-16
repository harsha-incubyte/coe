import React, { memo } from 'react';

/**
 * RealTimeDataChart
 * A mock heavy component that simulates a high-payload render.
 */
const RealTimeDataChart: React.FC = () => {
  // Simulate heavy computation during render
  // eslint-disable-next-line react-hooks/purity
  const start = performance.now();
  // eslint-disable-next-line react-hooks/purity
  while (performance.now() - start < 100) {
    // Artificial blocking loop (100ms) to simulate complex UI calculation
  }

  // Mock data for the chart
  const dataPoints = Array.from({ length: 50 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 5) * 50 + 50
  }));

  return (
    <div className="heavy-chart" style={{ padding: '1rem', background: '#111', borderRadius: '8px' }}>
      <h3>Live Telemetry Feed</h3>
      <svg width="100%" height="200" viewBox="0 0 500 100">
        <polyline
          fill="none"
          stroke="#007bff"
          strokeWidth="2"
          points={dataPoints.map(d => `${d.x * 10},${100 - d.y}`).join(' ')}
        />
        {dataPoints.filter((_, i) => i % 5 === 0).map((d, i) => (
          <circle key={i} cx={d.x * 10} cy={100 - d.y} r="2" fill="#fff" />
        ))}
      </svg>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#888' }}>
        {/* eslint-disable-next-line react-hooks/purity */}
        Processed 1,240,000 data nodes in {(performance.now() - start).toFixed(2)}ms
      </div>
    </div>
  );
};

// Protect from parent re-renders
export default memo(RealTimeDataChart);
