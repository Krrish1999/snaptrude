# Snaptrude Assigment
## Auomated 5 test cases evidences 
<img width="3018" height="1794" alt="image" src="https://github.com/user-attachments/assets/e4545125-658a-48a6-b328-ef6ff9602038" />
<img width="3024" height="1666" alt="image" src="https://github.com/user-attachments/assets/f0be119e-e024-4ce9-8b40-21ec71ff3b28" />



A web application testing project using Playwright with Allure reporting for comprehensive test results visualization.

## 🚀 Features

- **Automated Testing**: End-to-end testing using Playwright
- **Allure Reporting**: Beautiful and detailed test reports
- **Canvas Testing**: Rectangle creation and manipulation testing
- **CI/CD Integration**: GitHub Actions workflow for automated testing
- **Screenshot Capture**: Automatic screenshots for test failures and successes

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation

### Option 1: Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krrish1999/snaptrude.git
   cd snaptrude
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

### Option 2: Docker Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krrish1999/snaptrude.git
   cd snaptrude
   ```

2. **Build and run with Docker**
   ```bash
   # Build the Docker image
   docker build -t snaptrude-tests .
   
   # Run tests in container
   docker run -v $(pwd)/allure-results:/app/allure-results snaptrude-tests
   ```

3. **Or use Docker Compose**
   ```bash
   # Run tests only
   docker-compose up snaptrude-tests
   
   # Run tests and generate Allure report
   docker-compose --profile full-test up
   
   # Serve Allure report on http://localhost:8080
   docker-compose --profile report up allure-server
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EMAIL=your-email@example.com
PASSWORD=your-password
URL=https://app.snaptrude.com/login
```

### Playwright Configuration

The project uses `playwright.config.ts` with:
- Allure reporter for detailed test reporting
- Screenshot capture on every test
- Trace capture on retry
- Chromium browser testing

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/rectangle.spec.ts
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

## 📊 Test Reports

### Playwright HTML Report
```bash
npm run test:report
```

### Allure Report Generation
```bash
npm run allure:report
```

### Open Allure Report
```bash
npm run allure:open
```

## 🏗️ Project Structure

```
snaptrude/
├── src/
│   ├── components/          # Reusable UI components
│   ├── helpers/            # Helper functions and utilities
│   ├── pages/              # Page Object Models
│   └── utils/              # Utility functions
├── tests/                  # Test specifications
├── .github/workflows/      # GitHub Actions CI/CD
├── Dockerfile              # Docker container configuration
├── docker-compose.yml      # Docker Compose services
├── .dockerignore           # Docker build exclusions
├── allure-results/         # Allure test results (auto-generated)
├── allure-report/          # Allure HTML report (auto-generated)
├── test-results/           # Playwright test results
└── playwright-report/      # Playwright HTML report
```

## 🧩 Test Components

### Canvas Testing
- Rectangle creation with diagonal points
- Dimension setting and validation
- Offset mode testing (Center, Internal, External)
- Object properties panel testing

### Page Objects
- `Canvas`: Canvas interaction and drawing
- `Dashboard`: Dashboard navigation and project selection
- `Login`: Authentication handling

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Runs tests on every push/PR
2. Generates Allure reports
3. Uploads test artifacts:
   - Playwright HTML report
   - Allure results
   - Allure generated report

## 📸 Screenshots and Attachments

- **Automatic Screenshots**: Captured after every test
- **Allure Integration**: Screenshots visible in Allure reports
- **Failure Analysis**: Screenshots help debug test failures

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure `.env` file has correct credentials
   - Check if `auth/storageState.json` exists

2. **Test Failures**
   - Check screenshots in `allure-report/` or `playwright-report/`
   - Verify test data and selectors

3. **Allure Report Issues**
   - Ensure `allure-commandline` is installed
   - Check if `allure-results/` directory exists

### Debug Mode

Run tests with debug information:
```bash
DEBUG=pw:api npx playwright test
```

## 📚 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all Playwright tests |
| `npm run test:report` | Open Playwright HTML report |
| `npm run allure:report` | Generate Allure report |
| `npm run allure:open` | Open Allure report |

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `docker build -t snaptrude-tests .` | Build Docker image |
| `docker run snaptrude-tests` | Run tests in container |
| `docker-compose up snaptrude-tests` | Run tests with Docker Compose |
| `docker-compose --profile full-test up` | Run tests and generate report |
| `docker-compose --profile report up allure-server` | Serve Allure report on port 8080 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
- Check existing issues in the repository
- Create a new issue with detailed description
- Include test results and screenshots if applicable

---

**Note**: This project is configured to work with the Snaptrude web application. Ensure you have proper access and credentials before running tests.
