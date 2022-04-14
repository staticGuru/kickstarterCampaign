import web3 from "./web3";
import compiledFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(compiledFactory.interface),
  '0xc53087338d59964e152e071f5d5b45622f370abb'
);

export default instance;