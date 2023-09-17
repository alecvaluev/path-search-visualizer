import React from 'react';

const BOX_SIZE = '20px';

export function PaletteBox({color}){
    return (
        <div style={{backgroundColor: color,
                    width: BOX_SIZE, 
                    height: BOX_SIZE,
                    marginRight: '5px',
                    zIndex: 1000}} 
                    ></div>
    )
}