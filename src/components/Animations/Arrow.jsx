import * as d3 from 'd3';
import useWindowSize from '../../hooks/screenSize';

function AnimationD3(){
    let data = [32, 28, 32, 28, 32, 28, 32]
    const { width, height } = useWindowSize();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scale
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight, 0]);

    // Line generator with curve
    const lineGenerator = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveCatmullRom); // You can try other curves like curveBasis, curveCardinal, etc.

    const pathData = lineGenerator(data);
    
    return(
        <div className='w-100'>
            <svg width={width-44} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                  <path d={pathData} fill="none" stroke="steelblue" strokeWidth="2" />
                </g>
            </svg>
        </div>
    )
}

export default AnimationD3;