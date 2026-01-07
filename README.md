This repository showcases my test automation skills and understanding of QA best practices. The project demonstrates:

ShowCase
  E2E test automation with Playwright
  Cross browser testing (Chromium, Firefox, Safari)
  CI/CD integration with GitHub Actions
  Professional test documentation

Test Application
  Application Under Test: [Demoblaze](https://www.demoblaze.com/) 
    User authentication (sign up, login, logout)
    //Product categories
    Shopping cart functionality
    //Contact form

Test Coverage
  Authentication Tests:
    TC-001	Successful user LogIn
    TC-002	Stay logged in after navigation
    TC-003	Failed login - incorrect password
    TC-004	Failed login - incorrect username
    TC-005	Failed login - empty username
    TC-006	Failed login - empty password
    TC-007	Successful logout
    TC-008  Successful user SignUp
  Shopping Cart Tests:
    TC-009	Add random product to cart
    TC-010	Remove product from cart
    TC-011	Complete checkout
  Contact form Tests:
    //TC-012	
    //TC-013	
  Product categories Tests:
    //TC-014
    //TC-015

Prerequisites
  Node.js (v18 or higher)
  Git
  npm (comes with Node.js)
Installation
  Clone the repository
  git clone https://github.com/polotops/qa-automation-portfolio.git
  cd qa-automation-portfolio
  Install dependencies
  npm install
  Install Playwright browsers
  npx playwright install
Run all tests
  npx playwright test --headed

Open an issue for bugs or suggestions
Star the repository if you find it helpful
Fork the project for your own learning

Contact
Paolo Adrian Revollo Gomez
  Email: paolo9912@gmail.com
  LinkedIn: https://www.linkedin.com/in/polotopsi/
  GitHub: @polotops

License
This project is open source and available under the MIT License.
