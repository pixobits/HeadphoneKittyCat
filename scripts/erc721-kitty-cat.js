async function main() {
	const KittyCat = artifacts.require("ERC721_KittyCat");
  const KTYCAT = await KittyCat.new();

	console.log("ERC721_KTYCAT deployed to:", KTYCAT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
