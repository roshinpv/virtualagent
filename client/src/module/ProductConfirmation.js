import React from 'react';

const ProductConfirmation = (props) => {

    
    function getSDBSize() {
        var size  = "" 
        if (props.parameter.fields["SDB-SIZE"])
            size  = props.parameter.fields["SDB-SIZE"].stringValue
        else if (props.parameter.fields["sdb-size"]) {
            size = props.parameter.fields["sdb-size"].stringValue
        }

        return size       
    }
    const src = "assets/img/"  + getSDBSize() + ".png"


    return ( 
        <>
            {
                <div className="row">

                    <div className='col-xl-2'> </div>
                    <div className='col-xl-10'>
                        <div className='col-xl-8'>
                            <div class="card" style={{ opacity: 0.8 }} >
                                <div class="card-body">
                                    <h4 >{props.address.address1}</h4>
                                    <h4 >{props.address.address2}</h4>
                                    <h4 >{props.address.address3}</h4>
                                    <h4 >{props.address.address4}</h4>
                                    <h4 >{props.address.pin}</h4>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className='col-xl-8'>
                            <div class="card" style={{ opacity: 0.8 }} >
                                <div class="card-body">
                                    <h4 >You have  selected</h4>
                                    <img src={src} style={{height : "100%" , width : "100%"}}/>
                                </div>
                            </div>
                            <h1> </h1>
                        </div>
                    </div>
                </div>



            }


        </>
    );
};






export default ProductConfirmation