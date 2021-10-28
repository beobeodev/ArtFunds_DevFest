const ArtFundsStorage = artifacts.require('ArtFundsStorage')

module.exports = async function (deployer) {
  await deployer.deploy(ArtFundsStorage)
}
