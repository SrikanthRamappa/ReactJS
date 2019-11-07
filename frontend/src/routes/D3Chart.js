import React, { Component } from 'react';
import * as  d3 from "d3";
import { Link } from 'react-router-dom';

//import { select, scaleBand, scaleLinear, } from 'd3';

// https://www.d3-graph-gallery.com/graph/barplot_basic.html
// https://www.d3-graph-gallery.com/graph/barplot_animation_start.html

class D3Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.drawBarChart = this.drawBarChart.bind(this)
  }

  componentDidMount() {

    // get the data
    fetch('/test_app/api/user/fetch/All')
      .then(res => res.json())
      .then(result => {
        this.setState({ data: result });
      }, error => {
        this.setState({
          //     isLoaded: true,
          error: error
        });
      }

      );

  }


  async drawBarChart(data) {
    //  drawBarChart() {
    // const { data } = this.state;
    console.log(data)



    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data

    //d3.json(data, function(data) {   ---->// this function is not required this , we can directly pass the 'data' 
    // if it already set in the render,until end unless. we are access 'data' as json or csv from the folder.

    console.log(data[0])

    // X axis
    var x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(function (d) { return d.job; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.job); })
      .attr("y", function (d) { return y(d.pet); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.pet); })
      .attr("fill", "#e69450")

      // no bar at the beginning thus:
      .attr("height", function (d) { return height - y(0); }) // always equal to 0
      .attr("y", function (d) { return y(0); })

    // Animation
    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) { return y(d.pet); })
      .attr("height", function (d) { return height - y(d.pet); })
      .delay(function (d, i) { console.log(i); return (i * 100) })

  }


  resetForm = () => {
    window.location.reload();
  }

  render() {

    const error = this.state.error;             // -- this can be removed incase you wna tto just display
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      console.log(this.state.data);
      return (
        <div>
          <div>
            <h4 align="center"><b>D3 Simple Animation Bar chart</b></h4>
          <div class="rightpadding">
            <button align="Right" type="button" value="Refresh Page" className="btn btn-info"
              onClick={this.resetForm}>Refresh Page</button> &nbsp; &nbsp; &nbsp;
            </div>
          

          {/* <div> 
                      <button onClick={this.drawBarChart(this.state.data)} className="btn btn-primary"> D3 Animated Bar Charts</button>
                    </div> */}

          <div>
            {/* The link command will set the data and then it can be used in the drawBarchart(data) */}
            <Link to={this.drawBarChart(this.state.data)}></Link>

          </div>
          <div class="container">
            <div id="my_dataviz"></div>
          </div>
          </div>
        </div>
      );
    }
  }
}

export default D3Chart;

//####################################################################################################################

// import React, { Component } from 'react';
// //import * as  d3 from "d3";
// import { select, scaleBand, scaleLinear, } from 'd3';


// // https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0/

// class D3Chart extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//     this.drawBarChart = this.drawBarChart.bind(this)
//   }

//   componentDidMount() {
//     //  const data = [ 2, 4, 2, 6, 8,10,12,14 ]
//     // this.drawBarChart(data)

//     // get the data
//     fetch('/test_app/api/user/fetch/All')
//       .then(res => res.json())
//       .then(result => {
//         this.setState({ data: result });
//       }, error => {
//         this.setState({
//           //     isLoaded: true,
//           error: error
//         });
//       }

//       );
//     window.addEventListener('resize', this.drawBarChart)
//   }


//   async drawBarChart() {
//     const { data } = this.state;
//     console.log(data)


//     const node = select(this.node);
//     // const bounds = node.node().getBoundingClientRect();
//     // const w = bounds.width;
//     // const h = bounds.height;
//     const w = 400;
//     const h = 100;
//     //
//     const xscale = scaleBand();
//     xscale.domain(data.map(d => d.job));
//     xscale.padding(0.2);
//     xscale.range([0, w]);

//     const yscale = scaleLinear();
//     yscale.domain([0, 100]);
//     yscale.range([0, h]);
//     const upd = node.selectAll('rect').data(data);
//     upd.enter()
//       .append('rect')
//       .merge(upd)
//       .attr('x', d => xscale(d.job))
//       .attr('y', d => h - yscale(d.pet))
//       .attr('width', xscale.bandwidth())
//       .attr('height', d => yscale(d.pet))
//       .attr('fill', 'orange');
//   }

//   componentDidUpdate() {
//     this.drawBarChart();
//   }

//   componentWillMount() {
//     window.removeEventListener('resize', this.drawBarChart)
//   }

//   // }
//   render() {
//     const error = this.state.error;             // -- this can be removed incase you wna tto just display
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else {
//       console.log(this.state.data);
//       return (
//         <div>
//           <div>
//             <button onClick={this.drawBarChart(this.state.data)} className="btn btn-primary"> D3 Charts</button>
//           </div>
//           {/* <div ref="canvas"></div> */}
//           <svg
//             style={{ width: '50%', height: '100%' }}
//             ref={node => {
//               this.node = node;
//             }}
//           >
//           </svg>


//         </div>
//       );
//     }
//   }
// }

// export default D3Chart;


//#######################################




