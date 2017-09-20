# CONTRIBUTOR'S GUIDE

Thanks for your interest in contributing to this project. 
There are many ways to contribute, and we appreciate all of them.

If you don't know how to get start please go

- [issue tracking](#Issue-tracking) to raise issue for your questions, requests or bugs.
- [pull requests](#Pull-Requests) to contribute the development of this project.

## Issue tracking

We use GitHub Issues to track bugs, new feature requests and questions, please go and raise any
issues you have, we will try our best to help it.

Please read following terms before you raise an issue:

1. before you open an issue ticket, please search and check if there is already an

2. please explain your request/issue/question clearly, it would be better if you can provide
code example or application log/trace.

3. please follow the code of conduct.

## Pull requests

We appreciate contributors in the community, that are willing to improve this project. We basically follow the development style used in most of GitHub repos.


1. Search existing issues and/or pull request in the GitHub repository.
2. If it doesn’t exist, post an issue for the feature proposal.
3. Fork the repository, and develop your feature in the forked repo.
4. Create a pull request of your development branch to master branch. Our maintainers will then review your changes.
5. Once your change is finalized, the maintainer will merge your change.


## Development guide

### Building system

Unsafe JS is not using any build tools except YUI Compressor, the build script in `dist.sh` is just combine all source file then compress them. A good way to start working on Unsafe JS is just create a new source file in related directory under `src`, then add it in `./dist.sh script as an `include` statement.

### Unsafe JS Modules

Unsafe JS is a modularized project and organized in different modules, either you can contribute in an existing module, or you can create your new own module.

### Unit test

It is required for contributers to write test for their code, and must be reviewed by maintainers. Unsafe JS provide a easy-use test suite under `test` folder, as well as a simple test framework.

We suggest you can use TDD (Test Driven Development) strategy to develop, but it is not required.
