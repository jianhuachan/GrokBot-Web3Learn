import { deployScript, artifacts } from "../rocketh/deploy.js";

/**
 * Deploys a contract named "SimpleStorage" using the deployer account.
 * SimpleStorage has no constructor arguments.
 *
 * @param env Rocketh environment object.
 */
export default deployScript(
  async env => {
    const { deployer } = env.namedAccounts;

    const simpleStorage = await env.deploy("SimpleStorage", {
      account: deployer,
      artifact: artifacts.SimpleStorage,
      args: [],
    });

    const storedData = await env.read(simpleStorage, { functionName: "get" });
    console.log("📦 Initial storedData:", storedData);
  },
  {
    tags: ["SimpleStorage"],
  },
);
