import React, {Component} from 'react';
import NETWORK from '../utls/network';
import ReactHtmlParser from "react-html-parser";
import Age from './age';
import helper from '../utls/helpers'
import Chart from '../chart/chart'
import '../../sass/components/_table.scss'

class Feed extends Component {

    constructor(props){
        super(props)
        this.state = {
            loaded:false,
            fetchData:{},
            hitsPerPage:undefined,
            pageNo:0,
            hidenData:[],
            upVote:[]

        }
    }

   

    componentWillMount(){
        this.getData()
    }

    componentDidMount(){
        
    }

    getData = (page)=>{
        NETWORK.get(`v1/search_by_date?tags=(pollopt,num_comments,poll))&page=${page?page:0}`).then((res)=>{
            
            this.setState({
                loaded:true,
                fetchData:res.data.hits,
                hitsPerPage:res.data.hitsPerPage,
                pageNo:res.data.page,
                hidenData : helper.toArray(localStorage.getItem('hidenData')),
                upVote: helper.toObjct(localStorage.getItem('upvote')),
            })
        })
    }

    hide = id=>{
        localStorage.getItem('hidenData') == null ? localStorage.setItem("hidenData", id) : localStorage.setItem("hidenData", localStorage.getItem('hidenData')+","+id);
        this.setState({hidenData: helper.toArray(localStorage.getItem('hidenData'))});
    }

    upVote = data=>{

        // this.setState((prevState) => ({
        //     upVote: {                   
        //         ...prevState.upVote, 
        //            {a:2}
        //     }
        
        // }))
    }

    render() { 
        if(this.state.loaded){
            return ( <>
                <table className="data-table">
                    <thead>
                    <tr >
                        <td>Comments</td>
                        <td>Vote Count</td>
                        <td>Up vote</td>
                        <td>News Details</td>
                    </tr>
                    </thead>
                    <tbody >
                    {this.state.fetchData.map((data, index)=>(
                        <>
                            {this.state.hidenData.indexOf(data.objectID) == -1 ?(
                                
                                <tr key={index}>
                                    <td>{data.num_comments  != null ? data.num_comments : 0}</td>
                                    <td>{this.state.upVote[data.objectID]? this.state.upVote[data.objectID] :  data.points}</td>
                                    <td><span className="pointer" onClick={(e)=>this.upVote(data)}>&#9650; </span></td>
                                    <td>
                                        {ReactHtmlParser(data.story_text)}
                                        
                                        {data.url != null? (
                                            <span className="small">({data.url})</span>
                                        ):(
                                            <></>
                                        )}
                                        <span className="small">by </span><span className="small dark">{data.author}</span>
                                        <Age timestamp={data.created_at_i} />
                                        <span className="small dark pointer" onClick={(e)=>{this.hide(data.objectID)}}>[Hide]</span>
                                    </td>
                            </tr>):

                            (<></>)}

                        </>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {this.state.pageNo !=0 ?(
                        <span className="pointer" onClick={(e)=>this.getData(this.state.pageNo-1)}>Previous |</span>
                    ):(<></>)} 

                    <span className="pointer" onClick={(e)=>this.getData(this.state.pageNo+1)}>Next</span>

                </div>
                <div className="chart">
                    <Chart data={this.state.fetchData} hidenData={this.state.hidenData} />
                </div>
            </> );
        } else{
            return(<>
            <p>Loading...</p>
            </>)
        }
        
    }
}
 
export default Feed;