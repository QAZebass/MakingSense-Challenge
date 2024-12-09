
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
┃ ┗ 📜.last-run.json
┣ 📂tests
┃ ┗ 📜searchForCars.spec.ts
┣ 📜.gitignore
┣ 📜global.d.ts
┣ 📜package.json
┣ 📜playwright.config.ts
┣ 📜README.md
┗ 📜yarn.lock
```
## How to run the test

1. First, clone the repository using gitbash in your desired folder (usually C:)
```git clone git@github.com:QAZebass/MakingSense-Challenge.git```

2. Then, inside the folder of the repository, you can open gitbash there and do:
```code .```

3. After that, open the console in VScode and do ```yarn``` to install all the depedencies in the project

4. Finally, to run the tests in parallel mode, do
```yarn test``` or ```yarn test --ui``` for running them in the Playwright runner
