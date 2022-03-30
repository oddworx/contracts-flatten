# Oddworx Contracts Flatten

Repo containing all the flattened contracts of Oddworx.

### Why

We want to be able to import the original contract code for writing tests, but some contracts are in a hardhat project, some in a foundry project. It's not trivial to import contracts that are in hardhat project into a foundry project because it can't solve all the dependencies.