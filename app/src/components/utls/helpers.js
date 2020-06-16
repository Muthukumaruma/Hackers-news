const helper = {

    toArray:(data) => {
        try{
            
            if(data != null && data !=""){
                let splited = data.split(',')
                let arrayed = [];
                splited.map((val)=>{
                    arrayed.push(val)
                })
                return arrayed
    
            }else{
                return []
            }
        }
        catch(e){
            console.log(e.message)
        }
        
    },

    toObjct:(data)=>{
        try{
            if(data != null && data !=""){
               
            } else{
                return []
            }
        }catch(e){
            console.log(e.message)
        }
    }
    
}

export default helper