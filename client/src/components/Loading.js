import React, { useState } from 'react'
import GridLoader from 'react-spinners/GridLoader'

function Loading() {
    const [Loading,setLoading] = useState(true);
    const [color,setColor] = useState('#ffffff')
    // const override = css`
    // display: block;
    // margin: 0 auto;
    // border-color: red;
    // `;
  return (
    <div style={{marginTop:'150px'}}>
        <div className='sweet-loading text-center'>
            <GridLoader color = '#000' loading = {Loading} css = '' size={20}/>
        </div>
    </div>
  )
}

export default Loading
