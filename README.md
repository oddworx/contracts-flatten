# Oddworx Contracts Flatten

Repo containing all the flattened contracts of Oddworx.

## Why

Two reasons: unit-testing in other projects and setting up a test chain for testing user-interfaces.

**Unit Testing**

We want to be able to import the original contract code for writing tests, but some contracts are in a hardhat project, some in a foundry project. It's not trivial to import contracts that are in hardhat project into a foundry project because it can't solve all the dependencies.

This repo solves this part by having all the flattened contracts, then in a foundry project, we can import the contracts by adding this repo to a submodule, updating `requirements.tx` and importing it.

E.g.:

requirements.txt:

```txt
@oddworx/=lib/contracts-flatten/contracts/
```

MyContract.t.sol:
```solidity
import { Genzee } from "@oddworx/Genzee.sol"
import { Oddworx } from "@oddworx/Oddworx.sol"
import { OddworxStaking } from "@oddworx/OddworxStaking.sol"
```

**User Interface**

When building a user interface, we want to be able to test it agains a real blockchain. So far we've been using rinkeby testnet, but it's something really painful to setup and we can't really manipulate it to have a specific state we want to test. This is a recurring problem for Oddworx because we keep building, migrating contracts, and using the old contracts with the new ones.

In this repo we have everything we need to spin up a new chain and setup the specific state we want for the Oddworx/Genzee world. Details on chain and state setup will be added to this README soon.