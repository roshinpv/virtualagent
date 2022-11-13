import React from 'react';

const AddressForm  = (props) => {

    return (
        <>
        <div className="row">
        <div className='col-xl-2'> </div>
        {

         
        
        <div className='col-xl-8'>
        <div class="card" style={{opacity : 0.8}} >
        <div class="card-body">
          <h3 >{props.address.name}</h3>
          <h4 >Age : {props.address.age}</h4>
          <h4 >{props.address.address1}</h4>
          <h4 >{props.address.address2}</h4>
          <h4 >{props.address.address3}</h4>
          <h4 >{props.address.address4}</h4>
          <h4 >{props.address.pin}</h4>
        </div>
      </div>
      </div>   

      
        }
        
        </div> 
      </>
    );
    };
      





export default AddressForm