const path = require('path');

const hostUrl = 'http://localhost:8080'
export default {
  AdminOperation: function (browser) {
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
      .setValue('input[id="username"]', 'flakky')
      .pause(500)
      .setValue('input[id="password"]', 'tobi')
      .pause(500)
      .click('form button', () => {
        browser
          .pause(2000)
          .waitForElementVisible('#toast-container', 2000)
          .assert.visible('#toast-container')
          .assert.containsText(
            '#toast-container',
            'Welcome flakky, you\'re logged in'
          )
          .pause(1000)
          .assert.urlEquals(`${hostUrl}/allbooks`);
      })
      .pause(3000)
  },

  AddBookFailsInvalidDetails: (browser) => {
    browser
      .url(`${hostUrl}/addbook`)
      .moveToElement('input[id="title"]', 20, 20)
      .setValue('input[id="title"]', ' ')
      .assert
      .containsText('div.red-text', 'title is required')
      .clearValue('input[id="title"]')
      .clearValue('input[id="title"]')
      .setValue('input[id="title"]', 'title title')
      .pause(300)
      .moveToElement('input[id="author"]', 20, 20)
      .setValue('input[id="author"]', 'author another author')
      .moveToElement('input[id="publishedYear"]', 20, 20)
      .setValue('input[id="publishedYear"]', '2019')
      .pause(5000)
      .assert
      .containsText('div.red-text', 'PublishedYear can not be a future year')
      .pause(300)
      .clearValue('input[id="publishedYear"]')
      .setValue('input[id="publishedYear"]', 'fjhfj')
      .pause(300)
      .assert
      .containsText('div.red-text', 'PublishedYear can only be a number')
      .pause(300)
      .clearValue('input[id="publishedYear"]')
      .setValue('input[id="publishedYear"]', '2012')
      .moveToElement('input[id="isbn"]', 20, 20)
      .pause(300)
      .assert
      .containsText('div.red-text', 'isbn is required')
      .setValue('input[id="isbn"]', '895859')
      .assert.containsText('div.red-text', 'Provide a valid 13-digit ISBN')
      .clearValue('input[id="isbn"]')
      .setValue('input[id="isbn"]', '9473847484848')
      .setValue('input[id="quantity"]', '')
      .pause(500)
      .assert
      .containsText('div.red-text', 'quantity is required')
      .clearValue('input[id="quantity"]')
      .setValue('input[id="quantity"]', 'p')
      .moveToElement('textarea[id="description"]', 30, 30)
      .setValue('textarea[id="description"]', 'description')
      .moveToElement('textarea[id="aboutAuthor"]', 30, 30)
      .setValue('textarea[id="aboutAuthor"]', 'aboutAuthor')
      .pause(500)
      .click('form button', () => {
        browser
          .pause(2000)
      })
      .assert.attributeEquals('button[type=submit]', 'disabled', 'true')
      .pause(500)
  },

  AddBookSuccess:
    (browser) => {
      browser
        .url(`${hostUrl}/addbook`)
        .pause(2000)
        .moveToElement('.container.form-style', 20, 20)
        .assert.visible('.row.signup-head')
        .moveToElement('.col.s12', 20, 20)
        .assert.visible('div h5', ' Add Book ')
        .assert.visible('input[id="title"]')
        .assert.visible('input[id="author"]')
        .assert.visible('input[id="publishedYear"]')
        .assert.visible('input[id="isbn"]')
        .assert.visible('input[id="quantity"]')
        .assert.visible('textarea[id="description"]')
        .assert.visible('textarea[id="aboutAuthor"]')
        .assert.visible('div#image-field')
        .assert.containsText('form button', 'ADD BOOK')
        .setValue('input[id="title"]', 'titletitle')
        .pause(500)
        .setValue('input[id="author"]', 'authorauthor')
        .pause(500)
        .setValue('input[id="publishedYear"]', '2013')
        .pause(500)
        .setValue('input[id="isbn"]', '9829498324838')
        .pause(500)
        .setValue('input[id="quantity"]', '5')
        .pause(500)
        .moveToElement('textarea[id="description"]', 30, 30)
        .setValue('textarea[id="description"]', 'description')
        .pause(500)
        .moveToElement('textarea[id="aboutAuthor"]', 30, 30)
        .setValue('textarea[id="aboutAuthor"]', 'aboutAuthor')
        .pause(500)
        .click('form button', () => {
          browser
            .pause(2000)
            .waitForElementVisible('#toast-container', 2000)
            .assert.visible('#toast-container')
            .assert.containsText(
              '#toast-container',
              'Book with title: titletitle has been added'
            )
            .pause(2000)
            .assert.urlEquals(`${hostUrl}/allbooks`);
        })
        .pause(4000)
    },

  AdminDashboardBookListTab:
    (browser) => {
      browser
        .url(`${hostUrl}/admindashboard`)
        .pause(2000)
        .assert.visible('ul.tabs')
        .assert.containsText('ul.tabs li:nth-child(1)', 'BOOK LIST')
        .assert.containsText('ul.tabs li:nth-child(2)', 'BORROW REQUEST')
        .assert.containsText('ul.tabs li:nth-child(3)', 'RETURN REQUEST')
        .assert.visible('.bordered.highlight.responsive-table')
        .assert.elementNotPresent('Ooppss!!! You have not added any books to the library at the moment.')
        .assert.visible('#edit-book')
        .assert.visible('#delete-book')
        .moveToElement('#delete-book', 30, 30)
        .click('#delete-book')
        .pause(3000)
        .assert.visible('.swal-button-container')
        .assert.visible('.swal-button--cancel')
        .assert.visible('.swal-button--danger')
        .click('.swal-button--danger')
        .pause(2000)
        .assert.visible('.swal-button--confirm')
        .pause(3000)
        .click(('.swal-button--confirm'))
        .pause(2000)
        .pause(3000);
    },

  AdminDashboardBorrowRequestTab:
    (browser) => {
      browser
        .url(`${hostUrl}/admindashboard`)
        .pause(2000)
        .assert.visible('ul.tabs')
        .click('ul.tabs li:nth-child(2)')
        .assert.visible('.bordered.highlight.responsive-table')
        .pause(4000)
        .assert.containsText('.card-panel.row.center-align', 'Ooppss!!! No pending borrowed books record found.')
        .back()
        .assert.urlEquals(`${hostUrl}/allbooks`)
        .pause(2000)
        .click('.card')
        .pause(2000)
        .moveToElement('#form-lend', 30, 30)
        .assert.containsText('.waves-effect.waves-light.btn', 'BORROW')
        .click('#form-lend a')
        .pause(2000)
        .url(`${hostUrl}/admindashboard`)
        .pause(3000)
        .assert.visible('ul.tabs')
        .click('ul.tabs li:nth-child(2)')
        .pause(3000)
        .assert.visible('#accept-book')
        .moveToElement('#accept-book', 30, 30)
        .click('#accept-book')
        .pause(2000)
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .assert.containsText(
          '#toast-container',
          'Successfully accepted borrow request'
        )
        .pause(3000)
    },

  AdminDashboardReturnRequestTab:
    (browser) => {
      browser
        .url(`${hostUrl}/admindashboard`)
        .pause(2000)
        .assert.visible('ul.tabs')
        .click('ul.tabs li:nth-child(3)')
        .assert.visible('.bordered.highlight.responsive-table')
        .pause(1000)
        .assert.containsText('.card-panel.row.center-align', 'Ooppss!!! No return request pending.')
        .moveToElement('a.dropdown-button', 30, 30)
        .pause(1000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Profile')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/profile"]')
        .pause(2000)
        .assert.urlEquals(`${hostUrl}/profile`)
        .assert.visible('.responsive-table')
        .assert.visible('.btn-flat')
        .click('.btn-flat')
        .pause(2000)
        .moveToElement('a.dropdown-button', 30, 30)
        .pause(1000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Admin Dashboard')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/admindashboard"]')
        .pause(2000)
        .assert.urlEquals(`${hostUrl}/admindashboard`)
        .assert.visible('ul.tabs')
        .click('ul.tabs li:nth-child(3)')
        .pause(1000)
        .assert.visible('#return-book')
        .moveToElement('#return-book', 30, 30)
        .click('#return-book')
        .pause(2000)
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .assert.containsText(
          '#toast-container',
          'successfully accepted return request'
        )
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Profile')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/profile"]')
        .pause(2000)
        .assert.urlEquals(`${hostUrl}/profile`)
        .assert.visible('.responsive-table')
        .assert.containsText('#returned', 'Returned')
        .pause(3000)
    },

  RequestedBooksTable:
    (browser) => {
      browser
        .url(`${hostUrl}/admindashboard`)
        .pause(2000)
        .assert.visible('.profile-bio')
        .assert.visible('.bordered.highlight.centered.highlight.responsive-table')
        .assert.containsText('#title', 'Requested Books')
        .assert.visible('.pagination')
        .pause(3000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Log Out')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/"]')
    },

};