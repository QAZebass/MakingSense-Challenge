
![github-header-image](https://github.com/user-attachments/assets/d797e3c5-1e8a-4f8b-90f7-b8450889f771)
## About the challenge
A person wants to go to buy a car on www.mercadolibre.com. He is not sure about what model to buy and, for this reason, he wants to search for all the cars that have a price below
$2.000.000. But he has some considerations to take into account: The car must be located in Cordoba, and the product list must be shown from lowest to highest price. In addition, he wants to
know the number of results available.

## Folder Structure
```
┣ 📂.github
┃ ┗ 📂workflows
┃   ┗ 📜playwright.yml
┣ 📂pages
┃ ┣ 📜homePage.ts
┃ ┗ 📜productListPage.ts
┣ 📂playwright-report
┃ ┗ 📜index.html
┣ 📂screenshots
┃ ┗ 📜Validate that the user can search for a car-failed.png
┣ 📂support
┃ ┗ 📂data
┃   ┗ 📜staticInputData.json
┣ 📂test-results
┃ ┣ 📂.playwright-artifacts-19
┃ ┃ ┗ 📂traces
┃ ┣ 📂.playwright-artifacts-20
┃ ┃ ┗ 📂traces
┃ ┗ 📂.playwright-artifacts-21
┃   ┗ 📂traces
┣ 📂tests
┃ ┗ 📜searchForCar.spec.ts
┣ 📂tests-examples
┃ ┗ 📜demo-todo-app.spec.ts
┣ 📜.gitignore
┣ 📜global.d.ts
┣ 📜package.json
┣ 📜playwright.config.ts
┣ 📜README.md
┗ 📜yarn.lock
```
