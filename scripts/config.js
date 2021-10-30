
const anchor = require('@project-serum/anchor');
const utf8 = anchor.utils.bytes.utf8;

const DOORMAN_SEED = "doorman";

// the mint that's used across doorman + candymachine
const MINT = new anchor.web3.PublicKey(process.env.REACT_APP_MINT);
const CANDYMACHINE_INITIALIZOR_TOKEN_ACCOUNT = new anchor.web3.PublicKey(process.env.CANDYMACHINE_INITIALIZOR_TOKEN_ACCOUNT);

// candy machine config
const CANDYMACHINE_TREASURY = new anchor.web3.PublicKey(process.env.REACT_APP_CANDYMACHINE_TREASURY);
const CANDYMACHINE_CONFIG = new anchor.web3.PublicKey(process.env.REACT_APP_CANDYMACHINE_CONFIG);

// doorman config
const DOORMAN_CONFIG = new anchor.web3.PublicKey(process.env.REACT_APP_DOORMAN_CONFIG);
const DOORMAN_TREASURY = new anchor.web3.PublicKey(process.env.REACT_APP_DOORMAN_TREASURY);


async function getMintTokenVaultAddress() {
   const [mintTokenVault, mintTokenVaultBump] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode(DOORMAN_SEED), MINT.toBuffer()],
      program.programId
   );
   return mintTokenVault;
}

const provider = anchor.Provider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Doorman;

async function showConfig() {
   let accountData = await program.account.config.fetch(DOORMAN_CONFIG);
   accountData.costInLamports = accountData.costInLamports.toString();
   accountData.authority = accountData.authority.toString();
   accountData.treasury = accountData.treasury.toString();
   accountData.mintTokenVault = accountData.mintTokenVault.toString();
   accountData.goLiveDate = new Date(accountData.goLiveDate.toNumber() * 1000);
   accountData.mint = accountData.mint.toBase58();
   console.log("\n >> config account data: ", accountData);
}


module.exports = {
   CANDYMACHINE_TREASURY,
   CANDYMACHINE_CONFIG,
   CANDYMACHINE_INITIALIZOR_TOKEN_ACCOUNT,
   DOORMAN_SEED,
   DOORMAN_CONFIG,
   MINT,
   DOORMAN_TREASURY,
   getMintTokenVaultAddress,
   provider,
   program,
   showConfig
};
