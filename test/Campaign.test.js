const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign('100').send({ from: accounts[0], gas: "1000000" });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface),campaignAddress);
});

describe("campaign",()=>{
it("deploys a campaign and a factory",()=>{
  assert.ok(factory.options.address);
  assert.ok(campaign.options.address);
});
it("marks a caller as the campaign manager",async ()=>{
  const manager= await campaign.methods.manager().call();
  assert.equal(accounts[0],manager);
});
it("allow people to contribute the money and make as the approvers in the contract",async ()=>{
  await campaign.methods.contribute().send({value:'200',from:accounts[1]});
  const isContributor = await campaign.methods.approvers(accounts[1]).call();
  console.log(isContributor)
  assert(isContributor);
})

})
