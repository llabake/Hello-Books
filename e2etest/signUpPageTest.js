
const hostUrl = 'http://localhost:8080'
export default {
  'Ensure all elements are present on sign up page display': function (browser) {
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
      .assert.visible('li a', 'Sign Up')
      .moveToElement('#dropdown1', 20, 20)
      .click('#dropdown1 li a[href="/signup"]')
      .pause(2000)
      .assert.urlEquals(`${hostUrl}/signup`)
      .moveToElement('.container.form-style', 20, 20)
      .assert.visible('.row.signup-head')
      .moveToElement('.col.s12', 20, 20)
      .assert.visible('div h5', ' Create an HelloBooks Account ')
      .assert.visible('input[id="first_name"]')
      .assert.visible('input[id="last_name"]')
      .assert.visible('input[id="username"]')
      .assert.visible('input[id="email"]')
      .assert.visible('input[id="password"]')
      .assert.visible('input[id="confirm-password"]')
      .assert.containsText('form button', 'REGISTER')
      .moveToElement('.terms', 20, 20)
      .assert.visible('p', ' Already have an account? a[href="/signin"]Login Now')
      .pause(500)
  },

  'Ensure user signup fails when invalid details are provided': (browser) => {
    browser
      .url(`${hostUrl}/signup`)
      .moveToElement('input[id="first_name"]', 20, 20)
      .setValue('input[id="first_name"]', ' ')
      .assert
      .containsText('div.red-text', 'firstName is required')
      .clearValue('input[id="first_name"]')
      .setValue('input[id="first_name"]', ' j ')
      .assert
      .containsText('div.red-text', 'Minimum of 3 characters allowed')
      .clearValue('input[id="first_name"]')
      .setValue('input[id="first_name"]', 'hyhdidhdhdyegdhduegdudheuhduehdhduehdudeu')
      .clearValue('input[id="first_name"]')
      .setValue('input[id="first_name"]', 'owow')
      .pause(300)
      .moveToElement('input[id="last_name"]', 20, 20)
      .setValue('input[id="last_name"]', 'lastname')
      .moveToElement('input[id="username"]', 20, 20)
      .setValue('input[id="username"]', 'user')
      .pause(5000)
      .assert
      .containsText('div.red-text', 'Username too short Must be at least 5 characters')
      .pause(300)
      .clearValue('input[id="username"]')
      .setValue('input[id="username"]', 'weluser')
      .moveToElement('input[id="email"]', 20, 20)
      .pause(300)
       .assert
      .containsText('div.red-text', 'email is required')
      .setValue('input[id="email"]', 'email2gmail.com')
      .assert.containsText('div.red-text', 'Please enter a valid email')
      .clearValue('input[id="email"]')
      .setValue('input[id="email"]', 'email@gmail.com')
      .setValue('input[id="password"]', '')
      .pause(500)
      .assert
      .containsText('div.red-text', 'password is required')
      .clearValue('input[id="password"]')
      .setValue('input[id="password"]', 'passed')
      .assert
      .containsText('div.red-text', 'Password should contain atleast 8 characters')
      .clearValue('input[id="password"]')
      .setValue('input[id="password"]', 'passedijn')
      .assert
      .containsText('div.red-text', 
        'Password should contain atleast 1 uppercase, 1 lowercase letter, 1 number and a special character')
      .setValue('input[id="confirm-password"]', '@ssword')
      .clearValue('input[id="password"]')
      .setValue('input[id="password"]', 'P@assw0rd')
      .pause(500)
      .assert
      .containsText('div.red-text', 'Ensure passwords match')
      .click('form button', () => {
        browser
          .pause(5000)
          .assert.visible('div.red-text');
      })
      .assert.attributeEquals('button[type=submit]', 'disabled', 'true')
      .pause(500)
  },

  'Ensure user can signup with valid details on the signup page': (browser) => {
    browser
      .url(`${hostUrl}/signup`)
      .setValue('input[id="first_name"]', 'e2efirstname')
      .pause(500)
      .setValue('input[id="last_name"]', 'e2elastname')
      .pause(500)
      .setValue('input[id="username"]', 'e2eusername')
      .pause(500)
      .setValue('input[id="email"]', 'e2eemail@gmail.com')
      .pause(500)
      .setValue('input[id="password"]', 'E2ep@ssword')
      .pause(500)
      .setValue('input[id="confirm-password"]', 'E2ep@ssword')
      .pause(500)
      .click('form button', () => {
        browser
          .pause(2000)
          .waitForElementVisible('#toast-container', 2000)
          .assert.visible('#toast-container')
          .assert.containsText(
            '#toast-container',
            'Your Signup was successful e2eusername'
          )
          .pause(2000)
          .assert.urlEquals(`${hostUrl}/allbooks`);
      })
      .pause(4000)
      .assert.containsText('a.dropdown-button', 'e2eusername')
      .pause(500)
  },
};