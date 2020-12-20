import React, { useEffect, useState } from 'react';

const Avathar = (props) => {
    const colorCode = props.colorCode;
    const width = props.width;
    const height = props.height;
    const [avathartext, setAvatharText] = useState('');

    useEffect(()=>{
        getAvatharText(props.name)
    },[props.name])
    
    const getAvatharText = (tempName) => {
        let tempAvathartext = ''
        if(tempName.includes(' ')){
            let temp = tempName.split(' ');
            tempAvathartext += temp[0].charAt(0)
            tempAvathartext += temp[1].charAt(0)
        }
        else{
            tempAvathartext = tempName.substring(0,2)
        }
        setAvatharText(tempAvathartext)
    }
    return(
        <div className='avathar-component' style={{background : colorCode, height : `${height}px`, width: `${width}px`, borderRadius:`${width/2}px`}}>
            <div className='avathar-name' style={{lineHeight : `${width}px`}}>
                {avathartext}
            </div>
        </div>
    )
}

export default Avathar;