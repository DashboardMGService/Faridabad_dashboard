// src/components/MultivariateChart.tsx
import React from 'react';
import Plot from 'react-plotly.js';
import { MonthlyKpi } from '../data/kpiDashboardData';

interface MultivariateChartProps {
  data: MonthlyKpi[];
  xVar: keyof MonthlyKpi;
  yVar: keyof MonthlyKpi;
  zVar: keyof MonthlyKpi;
  title: string;
}

const MultivariateChart: React.FC<MultivariateChartProps> = ({ data, xVar, yVar, zVar, title }) => {
  const plotData = [
    {
      x: data.map(d => d[xVar]),
      y: data.map(d => d[yVar]),
      z: data.map(d => d[zVar]),
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 5,
        color: data.map(d => d.csi), // Color markers by CSI score
        colorscale: 'Viridis',
        showscale: true,
        colorbar: {
          title: 'CSI Score',
        },
      },
      text: data.map(d => d.month), // Show month name on hover
      hoverinfo: 'x+y+z+text',
    },
  ];

  const layout = {
    title,
    autosize: true,
    margin: { l: 0, r: 0, b: 0, t: 40 },
    scene: {
      xaxis: { title: xVar.toString() },
      yaxis: { title: yVar.toString() },
      zaxis: { title: zVar.toString() },
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
        color: '#333'
    }
  };

  return (
    <Plot
      data={plotData as any}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true, displayModeBar: false }}
    />
  );
};

export default MultivariateChart;
