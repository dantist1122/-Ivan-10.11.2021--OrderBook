import React from "react";

export const Disconect = (handleInactivestate: () => void) => {
    return (
        <>
          <button className='disconent' onClick={() => handleInactivestate()}>Connect</button>
        </>
      );
}