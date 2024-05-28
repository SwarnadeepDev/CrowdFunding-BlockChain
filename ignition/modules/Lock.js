const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BallotModule = buildModule("BallotModule", (m) => {
  const ballot = m.contract("Lock");

  return { ballot };
});

module.exports = BallotModule;

// 0xD338AC584bb26f24F3aF0683ef12dB90241616fe
