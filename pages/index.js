import React,{useEffect} from 'react'
import factory from '../ethereum/factory';

const CampaignIndex =()=>{
     useEffect(async()=>{
          const campaign = await factory.methods.getDeployedCampaigns().call();

          console.log(campaign);

     },[]);

     return(
          <div><h1>CampaignIndex</h1></div>
     )
}

export default CampaignIndex;