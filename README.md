# sauce-demo

Automation demonstration using Playwright

## installation and setup

1. install playwright `npx playwright install`
2. install the project `npm i`

## running tests

run `npx playwright test`

if visual debug is required run `npx playwright test --ui` in the terminal

tests can also be run from VSCodes test explorer

## notes

1. initial project setup
2. automate login flow
    used testIds rather than getByRole.  getByRole is arguably better due to implicit accessibility but testIds are everywhere
3. automate full e2e journey
4. refactor to POM
5. pick at least one other test per page, ideally a passing and failing scenario

## todos / nice to haves

1. ~~gh action, on pr / on push to main, workflow dispatch. fee tier gh so dont do this too early~~ get this for free from a playwright install
playwright install on free tier is *really* slow - nearly 10 mins.  change this to workflow dispatch only
2. pretttier pre-commit / husky
3. eslint
4. dependabot
5. conventional commits
6. axe (accessibility check)
