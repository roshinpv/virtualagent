import React from 'react';

const FinalApplication = (props) => {

  

  function getSDBSize() {
    var size  = "" 
    if (props.parameter.fields["SDB-SIZE"])
        size  = props.parameter.fields["SDB-SIZE"].stringValue
    else if (props.parameter.fields["sdb-size"]) {
        size = props.parameter.fields["sdb-size"].stringValue
    }

    return size       
  }

  const size = getSDBSize() 
  const src = "assets/img/"  + size + ".png"


  return (
    <>
      {

        



        <div class="container">

          <div class="row">


            

            <div class="col-sm-1"> </div>
            <div class="col-lg-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

              <div class="info-item d-flex">
              
                <div>
                  <h4>Branch:</h4>
                  <p>Branch 01</p>
                </div>
              </div>

              <div class="info-item d-flex">
                
                <div>
                  <h4>Account:</h4>
                  <p>Safe Deposit</p>
                </div>
              </div>

              <div class="info-item d-flex">
               
                <div>
                  <h4>Configuration:</h4>
                  <p>{size}</p>
                  <img src={src} width={200}/>
                </div>
              </div>
            </div>
            <div class="col-sm-7">
              <form class="form-horizontal" role="form">

                <h4>Address</h4>

                <div class="form-group">
                  <label for="inputFullName" class="col-sm-4 control-label">Full Name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputFullName" name="full-name" placeholder="Full Name" value={props.address.name}/>
                  </div>
                </div>

                <div class="form-group">

                  <label for="inputAddressLine1" class="col-sm-4 control-label">Address Line 1</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputAddressLine1" name="address-line1" placeholder="Address Line 1" value={props.address.address1} />
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputAddressLine2" class="col-sm-4 control-label">Address Line 2</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputAddressLine2" name="address-line2" placeholder="Address Line 2" value={props.address.address2}  />
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputCityTown" class="col-sm-4 control-label">City</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputCityTown" name="city-town" placeholder="City" value={props.address.address3}  />
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputStateProvinceRegion" class="col-sm-4 control-label">State</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputStateProvinceRegion" name="state-province-region" placeholder="State" value={props.address.address4}  />
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputZipPostalCode" class="col-sm-4 control-label">Zip Code</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputZipPostalCode" name="zip-postal-code" placeholder="Zip Code" value={props.address.pin}  />
                  </div>
                </div>

                <div class="form-group">

                  <div class="col-sm-10">

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      }


    </>
  );
};






export default FinalApplication