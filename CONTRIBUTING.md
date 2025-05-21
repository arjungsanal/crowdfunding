# Contributing to CrestFunding

Thank you for your interest in contributing to CrestFunding! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Create a new branch following our branch naming convention
3. Make your changes
4. Submit a pull request

## Before Contributing

- Check if there's an existing issue discussing the change/feature you want to work on
- If not, open a new issue to discuss your proposed changes before starting work
- This helps avoid duplicate work and ensures your contribution aligns with project goals

## Branch Naming Convention

Use the following format for branch names:
- `feature/description` - For new features
- `fix/description` - For bug fixes
- `docs/description` - For documentation changes
- `refactor/description` - For code refactoring

## Commit Message Guidelines

Follow conventional commits for clear history:

```
type(scope): description

[optional body]
[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add OAuth authentication
```

## Pull Request Process

1. Open an issue first to discuss the changes
2. Create a branch with appropriate naming
3. Make your changes
4. Update documentation if needed
5. Ensure tests pass (optional)
6. Submit PR with clear description of changes
7. Link the PR to the relevant issue
8. Wait for review and address any feedback

## Development Process

1. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/crowfunding.git
```

2. Add upstream remote:
```bash
git remote add upstream https://github.com/arjungsanal/crowdfunding.git
```

3. Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

4. Keep your branch updated:
```bash
git fetch upstream
git rebase upstream/main
```

## Code Style

- Follow existing code style
- Use TypeScript features appropriately
- Comment complex logic
- Write meaningful test cases

## Questions?

Feel free to reach out by:
- Opening an issue
- Commenting on relevant issues
- Joining project discussions

Thank you for contributing to CrestFunding!