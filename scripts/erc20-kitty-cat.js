async function main() {
	const KittyCat = artifacts.require("ERC20_KittyCat");
	const initialSupply = web3.utils.toWei("1000000000", "ether");
	const KTYCAT = await KittyCat.new(initialSupply);

	console.log("KTYCAT deployed to:", KTYCAT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });