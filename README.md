# Playwright Starter

## Playwright Template Project

### Installation


- Install **pnpm** <https://pnpm.io/installation> (plain npm or yarn are also supported but scripts will have to be adjusted)
- ```pnpm i```
- On CI: ```npm i --prod``` will ignore dev dependencies

### Execution

- Install browsers with ```pnpm exec playwright install```

- Using VS Code: install <https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright> and
use the test runner.

- Using the CLI: ```pnpm exec playwright test --grep "<test tag> or regex" --project=chrome```

### Project Structure

- **src/Common**: baseline test dependencies and data context classes (UI and HTTP).

- **src/CustomFixtures**: project group specific custom test fixtures. Every fixture makes use of generic test management fixture and exports the loaded data for test paramters.

- **src/Data**: test data setup classes and static files. Also includes folder with test group specific scenario parameters.

- **src/HttpClients**: setup of API clients divided in modules, clients and API handlers.

- **src/Infrastructure**: bundles up functionality to deal with different environments, file system operations and several utilities, from string extensions to date time manipulation wrappers.

- **src/PageObjects**: classes which abstract properties and behaviour of the different pages used in test scenarios, all pages extend a BasePage class.

- **src/Steps**: Individual units of execution with a test scenario, which may include one or multiple actions as well as parameters. These actions can be UI interactions, requests to external APIs or a mix of both. Each step can refer to data outside its scope through the singleton instance of the **ProjectUIContext** and pass along data to other steps through it. Each step has a description which will be included in the allure report. All steps extend a BaseSteps class which defines methods for dependency instantiation and data sharing.

- **TestDataExports**: Folder used to save all data generated and used throughout tests in JSON format. Mostly for local usage.

- **Tests**: Holds both the spec files containing test scenarios.

- **allure-results**: stores Allure reports if the environment variable **USE_ALLURE** is set to 1.

- **test-results**: default folder for other test reports

### Test Organization and Setup

- **Custom Fixture Usage**: custom fixtures are allocated to specific test groups in order to optimize the resources for test execution. Each test group should opperate as a self contained unit and shouldn't make use of what it doesn't need. To this end, each spec file makes use of a custom fixture made by the merge of a generic test management fixture and a group specific fixture. The custom fixture file will also import the paramters data loaded through its specific JSON file from **Data\TestParams** and export that data through the const **testParams**.

- **Parameter Setup**: each test scenario can be made up of a single or multiple test cases, depending on the amount of sets of parameters allocated. **String extensions** are responsible for reading, parsing and building the specific test case based on the array of parameters sets provided. **The convention is to allocate a specific JSON file to each spec file which in turn uses the test description as the key to the array of parameters values to be used.**. Paramter files are to be stored on **Data\TestParams** and loaded through the respective custom test fixture.

- **Dependency Chain**: each scenario is made up of individual steps. These steps may or may not accept parameters (**strings, booleans or numbers**) and each step will **instantiate one or multiple base dependencies** (page objects or api handlers). Additionaly, each step can make use of the ProjectUIContext singleton to retrieve data from / share data with other steps, as well as make use of static methods for some sort of data transformation.

- **Before & After each routines**: each test will annotate the suite name before running so it's displayed on the allure reporter. Additionally in some cases a ProjectUIContext data cleanup is executed. After each test executes, depending on the test result and environment variables, a full page screenshot is taken and test specific data is stored on a JSON file and included as a report artifact.

- **Environment Selection**: tests are set to run on devqa or staging environments. On the CLI this can be set through ```EXPORT NODE_ENV="<envname>"``` (bash) or ```$env:NODE_ENV="<envname>"``` (powershell). Alternatively this can bet set programmatically by switching the value on **Infrastructure\Env\EnvManager.ts**. On Jenkins this will be defined as an environemnt variable (**ENV**) defaulting to a pipeline specific value. Constant values such as the global timeout can bet set on **Common\Constants.ts**.

### Lint & Format upon commit toolchain
  
- **Summary**: code will be linted and formatted upon commit. If issues are not automatically fixed changes will be required.
- **Major Rules**: avoid the use of ```any``` as type declaration and make sure async / await is properly set.
- **Dependencies**:
  - Husky: <https://typicode.github.io/husky/>
  - Prettier: <https://prettier.io/>
  - ESLint: <https://eslint.org/>
  - commitlint: <https://commitlint.js.org/>
  - lint-staged: <https://github.com/lint-staged/lint-staged>

#### Setup
  
- **Husky**: folder **.husky** must be set on project root. In this case that will be **flow_qa_ui_tests/.husky**. There are several ways to configure this as per documentation (manual or through npx husky). Husky will execute the **lint-staged** configuration as set on package.json throught lint-staged which is set on the **flow_qa_ui_tests/.husky/pre-commit** hook.
- **Prettier**: rules are set though **.prettierrc.json** and files to be ignored by the formatter are set on **.prettierignore.json**. For vscode users it is recommended the installation of <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode> and set it as the default formatter for the project.
- **ESLint**: rules are set though **.eslintrc.json** and files to be ignored by the linter are set on **.eslintignore.json**. For vscode users it is recommended the installation of <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>.
- **commitlint**: this will enforce the conventional configuration upon commits as recommended on <https://www.conventionalcommits.org/en/v1.0.0/#summary>. The standard is set on **.commitlintrc.json** and triggered through the **flow_qa_ui_tests/.husky/pre-commit** hook. If the commit message doesn't follow the conventions the commit itself will fail.

#### Addtional Information

- These dependencies are not installed on CI.
- It possible to run the linter before commit through **npm run lint**. However this will only raise linter issues and won't apply any formatting.

### Jenkins

#### Pipeline parameters

- **NODE_ENV**: execution environment, can be ```dev``` or ```stage```

- **USE_ALLURE**: sets **Allure** as the default reporter, can be 1 or 0

- **PW_PROJECT**: name of the playwright project as defined in **playwright.config.ts**, used to define which browser will be used.

- **PW_WORKERS**: number of worker threads to be used within each shard.

- **PW_SHARDS**: numbers of shards through which the tests will be splitted. This also defines how many parallel stages Jenkins will
dynamically build.

- **PW_TAG**: name of the tag used to filter a specific test group

- **PW_TRACE**: generate of Playwright tracing file for each test retry

- **PW_SCREENSHOT_ON_FAIL**: takes screenshot if test status equals failure, should be enabled by default on all pipelines except Development Pipeline (PW_CORE_E2E_TESTS)

- **PW_EXPORT_DATA**: exports all data captured on the in-memory ProjectUIContext map storage into a json file

#### **Pipeline Execution**

- The pipeline Jenkinsfile is set to optimize available resources and execute up to the **shards * workers** tests in parallel. The pipeline is flexible and multiple combinations of resource allocation, environment and browsers are possible. Additionaly it's possible to persist screenshots, project data in JSON format and Playwright tracing zip files.  