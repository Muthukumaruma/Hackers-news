import React, {useState, useEffect} from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const Age = props=>{
    
    const [age, setAge] = useState(0);

    useEffect(()=>{
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US');
        setAge(timeAgo.format(Date.now() - props.timestamp ));
    },[props])

    if(props.timestamp && age !=0){
        return(
        <span className="small">{age}</span>
        )
    }else{
        return(<></>)
    }
    
}

export default Age