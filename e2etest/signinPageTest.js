
const hostUrl = 'http://localhost:8080'
export default {
  SignInPage: function (browser) {
    browser
      .url(hostUrl)
      .resizeWindow(1700, 800)
      .maximizeWindow()
      .waitForElementVisible('body', 10000)
      .pause(1000)
      .assert.containsText('a.dropdown-button', 'Hi, User')
      .moveToElement('a.dropdown-button', 30, 30)
      .pause(1000)
      .click('a.dropdown-button')
      .pause(1000)
      .assert.visible('li a')
      .assert.visible('li a', 'Sign In')
      .moveToElement('#dropdown1', 20, 20)
      .click('#dropdown1 li a[href="/signin"]')
      .pause(2000)
      .assert.urlEquals(`${hostUrl}/signin`)
      .moveToElement('.container.form-style', 20, 20)
      .assert.visible('.row.signup-head')
      .moveToElement('.col.s12', 20, 20)
      .assert.visible('div h5', ' Login to HelloBooks Account ')
      .assert.visible('input[id="username"]')
      .assert.visible('input[id="password"]')
      .assert.containsText('form button', 'SIGN IN')
      .moveToElement('.terms', 20, 20)
      .assert.visible('p', ' Don\'t have an account? a[href="/signup"]Sign Up Now')
      .pause(500);
  },
  UserSignInFailsMissingFields: (browser) => {
    browser
      .url(`${hostUrl}/signin`)
      .setValue('input[id="username"]', 'user')
      .pause(500)
      .keys(browser.Keys.ENTER)
      .clearValue('input[id="username"]')
      .pause(500)
      .setValue('input[id="username"]', 'user')
      .click('form button', () => {
        browser
          .pause(5000)
          .assert.visible('div.red-text');
      })
      .assert.attributeEquals('button[type=submit]', 'disabled', 'true')
      .pause(1000);
  },
  UserSignInFails: (browser) => {
    browser
      .url(`${hostUrl}/signin`)
      .setValue('input[id="username"]', 'e2eusername')
      .pause(500)
      .keys(browser.Keys.ENTER)
      .pause(500)
      .setValue('input[id="password"]', 'user')
      .click('form button', () => {
        browser
          .pause(50)
      })
      .waitForElementVisible('#toast-container', 2000)
      .assert.visible('#toast-container')
      .pause(1000);
  },
  UserSignInSuccessfull: (browser) => {
    browser
      .url(`${hostUrl}/signin`)
      .setValue('input[id="username"]', 'e2eusername')
      .pause(500)
      .setValue('input[id="password"]', 'E2ep@ssword')
      .pause(500)
      .click('form button', () => {
        browser
          .pause(2000)
          .waitForElementVisible('#toast-container', 2000)
          .assert.visible('#toast-container')
          .assert.containsText('#toast-container', 'Welcome e2eusername, you\'re logged in')
          .pause(2000)
          .assert.urlEquals(`${hostUrl}/allbooks`);
      })
      .pause(4000)
      .assert.containsText('a.dropdown-button', 'e2eusername')
      .pause(500);
  },
  UserSignOut: (browser) => {
    browser
      .moveToElement('a.dropdown-button', 30, 30)
      .pause(1000)
      .click('a.dropdown-button')
      .pause(1000)
      .click('#dropdown1 li a[href="/"]')
      .pause(2000)
      .assert.urlEquals(`${hostUrl}/`)
      .assert.containsText('a.dropdown-button', 'Hi, User')
      .pause(2000)
  },
};