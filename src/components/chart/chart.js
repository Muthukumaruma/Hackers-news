import React, { Component } from 'react';
import CanvasJSReact from '../canvas/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = []

class Chart extends Component {
    
    constructor(props){
        super(props);
        this.state={}
    }

    componentDidMount(){
        this.setGraphData()

    }

    componentDidUpdate(){
        dataPoints = []
        this.setGraphData()
    }

    setGraphData = ()=>{
        var chart = this.chart
        this.props.data.map((val)=>{
            
            if(this.props.hidenData.indexOf(val.objectID) === -1 || this.props.upVote>0){
                dataPoints.push({ 
                    x: parseInt(val.objectID) , 
                    y: localStorage.getItem(val.objectID) !== null && localStorage.getItem(val.objectID) !== "" ?parseInt(localStorage.getItem(val.objectID)) : parseInt(val.points)
                })
            }
           
        });
        
        console.log(dataPoints)
        
        chart.render(); 
    }

    render(){
        
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
           
            axisY: {
                title: "Votes",
                
            },
            axisX: {
                title: "Id",
                labelAngle: 45 ,
                titleWrap:false,
                labelAutoFit:false,
                valueFormatString:	"########",
               
            },
            data: [{
                type: "line",
                toolTipContent: " {x}: {y}",
                dataPoints: dataPoints
                    
                
            }]
        }

        return(
            <>
            <div>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref} />
            </div>
                
            </>
        )
    }
    
}

export default Chart