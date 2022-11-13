import React from 'react';

const AccountSummary  = (props) => {
   
    return (
        <>
        <div className="row">
        {props.accounts.map((account , index) => (
        <div className='col-xl-4'>
        <div class="card" style={{opacity : 0.6}} >
        <div class="card-body">
          <h4 class="card-title">{account.type}</h4>
          <h1 class="card-title">{account.balance}</h1>
        </div>
      </div>
      </div>   

      
        ))}
        
        </div> 
      </>
    );
    };
      





export default AccountSummary