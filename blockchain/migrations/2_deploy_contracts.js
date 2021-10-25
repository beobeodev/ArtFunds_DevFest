const ArtFundsStorage = artifacts.require('ArtFundsStorage')

module.exports = async function (deployer) {
  await deployer.deploy(ArtFundsStorage).then(() => console.log(ArtFundsStorage.address))
}
