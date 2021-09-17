# ChatApp Mobile Computing Project

## Installation

`yarn` or `npm install`

## Development

- "start": "expo start",
- "android": "expo start --android",
- "ios": "expo start --ios",
- "web": "expo start --web",
- "eject": "expo eject",
- "test": "jest --watchAll", --> to be configured
- "commit": "cz",
- "prepare": "husky install"

### Installing a Third-Party Library

> 💡 Expo recommends always using `expo install` instead of `npm install` or `yarn add` directly because it allows `expo-cli` to pick a compatible version of a library when possible and also warn you about known incompatibilities.

Once you have determined if the library is compatible, use `expo-cli` to install the package:

```bash
expo install @react-navigation/native
```

**`expo install` will default to using npm unless it detects a `yarn.lock` file in the root directory**

## Contributing

## Supported devices

- iPhone
- Samsung Galaxy
- Huawei
- Oppo
- Google Pixel
- One

## Comments

Across all languages and projects, developers should write helpful comments where possible, linking to documentation and stack overflow bugs where possible.

If you notice you are implementing something in an odd way due to restrictions, this should be documented in a comment. However, if the code is quite obvious there is no need to write a comment. For example, there is no need for a comment in the following snippet:

```javascript
// if this equals true
if (this === true) {
```

Try to use `TODO HIP-000:` comments where possible should you see potential improvements, even if you are not tasked with doing work on that feature at the time. This should allow developers to update and improve code when time allows. Be sure to create an associated ticket outlining what needs to be achoeved and tag it under the `Tech Debt` epic. This way it can be found and scheduled in future.

## Git

### Branching strategy

We use [gitlab flow](https://guides.github.com/introduction/flow/) for our release/branching strategy.
Branches should be named in the following format: feat/<feature-name>

### Commits format

We use the Conventional Commits standard for commit messages, a specification for adding human and machine readable meaning to commit messages.

A brief overview of the rules:

- Initial commit: `npm or yarn commit` (see https://github.com/commitizen/cz-cli)
- Subsequent commits: `npm or yarn amend`

**Note:** A chore would not show up in the changelog, a fix would be a bugfix and a feature would be for a new feature. Hotfix is a special branch type used when patching a production issue

### Use [atomic commits](https://www.freshconsulting.com/atomic-commits/)

We use atomic comits - 1 MR = 1 commit.

#### Approach

- Commit each story, fix or task as a separate change
- Only commit when a block of work is complete (or amend the commit until it is complete)
- Commit each layout change separately
- One commit for layout, logic and additional assets

#### Benefits

- Easy to roll back without affecting other changes
- Easy to make other changes on the fly
- Easy to merge features to other branches
- Easy to unit test, peer review and QA
- Better alignment to Single Responsibility Principle

### Feature branches

Feature branches should be `[type]/[ticket number]/[short description]`, for example:

```bash
git checkout -b feature/trellocard-123/verb-based-description
git checkout -b fix/trellocard-123/verb-based-description
git checkout -b chore/trellocard-123/verb-based-description
```

### Pull requests

Merge requests are used to provide constructive feedback and enforce coding standards. They should help you develop your coding skills, while ensuring we deliver performant, maintainable and working code.

Before opening a pull request, make sure your branch is ready for review (unless you intend to add the `WIP` label)

You should assign it to yourself and select a number of individuals you think should approve it, commonly your feature team.

#### Pull request etiquette

There are four accespted types of comment in our merge requests:

- QN: Questions - if you are not sure of what or why something has been done, leave a question for the engineer to get back to you.
- FIX: Must fix - these are issues that have to be resolved for the reviewer to approve the MR.
- OBS: Observations - these are chances to educate/learn, suggesting alternative approaches, while not suggesting the current solution is invalid. Such changes would not stop the reviewer approving the MR. You could observe the use of a `forEach` when a `map` might be better used, for example.
- NP: Nitpick - these are minor changes that wouldnt stop you approving the Merge Request, but would be good to tidy up. Using functions over arrow functions for example, or a spelling mistake.

#### Resolving comments

You should address all FIX comments and respond or address others, then request the commenter to resolve the comment themselves so they can assert you have completed them as they would expect. If they are not available, feel free to resolve the comment so you can merge, but have them check back later to make sure nothing was missed.

## Rebasing

We use rebasing rather than merges to keep our feature branches up to date, and we also squash our commits.

Each feat/fix/chore should be a single commit, this way you can easily revert or cherry pick the commit without having to be aware of a large number of commits.

Squashing also makes rebasing less painful as you only have to resolve potential conflicts with the single commit rather than a great many.

You can of course amend a commit to add more changes to that single commit.

To squash this can be done in the PR thanks to github. If you would like to do this manually, see below and find ([more info here](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html)):

`git rebase HEAD~[number of commits]`

then select pick or squash accordingly. You can then

To rebase:

```bash
  git checkout develop
  git pull
  git checkout feature/HIP-000/some-task
  git rebase develop
```

You may have to fix conflicts, but follow the on screen instructions. To add changes:

```bash
  git add .
  git rebase --continue
```

To abort a rebase:

```bash
  git rebase --abort
```

If you already have a remote for the active branch, the above process will mean you will have to push with force, so be sure you're ready to push as you can lose history.

```bash
  git push --force
```

**WARNING:** Pushing with force can overwrite remote code, so make local copies if you need.

## Principles

### Functional rather than Object Oriented programming

> <https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0>

- [Declarative programming](https://dev.to/adnanbabakan/declarative-programming-with-javascript-2h97)
- [Functional programming](https://opensource.com/article/17/6/functional-javascript)

Functional programming is an approach to writing code with pure, composable functions. See the article above for more information, but essentially, a pure function would give the same result if passed the same arguments, would not mutate existing state/objects and have a declarative approach rather than imperative.

We have some leagacy Object Oriented Code (OOP) in the microservices and associated packes. We should refactor these when we have time.

### [KISS](https://henriquesd.medium.com/dry-kiss-yagni-principles-1ce09d9c601f)

Keep it simple stupid

### [DRY](https://henriquesd.medium.com/dry-kiss-yagni-principles-1ce09d9c601f)

> <https://www.nickang.com/what-is-dry-programming/>

- Dont
- Repeat
- Yourself

### [SOLID](https://siderite.dev/blog/solid-principles-plus-dry-yagni-kiss.html/)

> <https://thefullstack.xyz/solid-javascript>

- Single Responsibility Principle
- Open-Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

### Code smells

Code smells, I was hoping to cover some common code smells, like nested if statements, string vs enums, impure functions, functions with multiple responsibility, fetching risky object props without lodash.get(), and linking to something like this: <https://github.com/ryanmcdermott/clean-code-javascript>
<https://medium.com/@marilu597/general-coding-guidelines-clean-code-from-day-1-9ab0804e5d91>

## As little markup as is neccassary

Try to use as little markup as possible when creating a page, making good use of psuedo elements (`::before` and `::after` in CSS). This reduces the weight of the page, avoids confliction with other CSS rules and makes the code more maintainable for developers, as there is simply less code to manage.

## General code style

- Double spaced indentation
- Max 120 character lines
- New line above return
- New line above if
- All variable declared at the top of the scope (class, function, if statement)
- function statements have a space after brackets
  - `function name(var) {`
- if statements have a space before and after brackets
  - `if (this === that) {`
- Use identical value checks
  - `===` rather than `==`
- if statements test variable -> value
  - `if ($var === 'test') {`
  - not
  - `if ('test' === $var) {`
- Single quote nesting double quotes
  - `$htmlString = '<html class="class">'`
  - not
  - `$htmlString = "<html class=\"class\">"`
- Type casting for security
  - `(int) $someVar`
- Alphabectical SCSS/CSS rules

### Testing

Each test definitions should be as descriptive as possible, outlining which page/class, method/functionality it is testing and its excpected behaviour. For example:

```javascript
describe('My App', () => {
  describe('My Controller', () => {
    it('should contain someMethod', () => {
      expect(typeof someMethod).toBe(''); =>
    });

    it('someMethod should return false if nothing passed', () => {
      expect(some(true)).toBe(false);
    });
  });
});
```
