async function main() {
	const KittyCat = artifacts.require("ERC721_KittyCat");
	const KTYCAT = await KittyCat.new();
	await KTYCAT.initKtyCat("0x73b1736107bC2Bf1eD9EE10397a6c19321A011c8");

	console.log("ERC721_KTYCAT deployed to:", KTYCAT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
