const path = require('path');

const hostUrl = 'http://localhost:8080'
export default {
  UserOperation: function (browser) {
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
      .setValue('input[id="username"]', 'e2eusername')
      .pause(500)
      .setValue('input[id="password"]', 'E2ep@ssword')
      .pause(500)
      .click('form button', () => {
        browser
          .pause(2000)
          .waitForElementVisible('#toast-container', 2000)
          .assert.visible('#toast-container')
          .assert.containsText(
            '#toast-container',
            'Welcome e2eusername, you\'re logged in'
          )
          .pause(2000)
          .assert.urlEquals(`${hostUrl}/allbooks`);
      })
      .pause(7000)
      .assert.containsText('a.dropdown-button', 'e2eusername')
      .pause(500)
  },


  Search: (browser) => {
    browser
      .url(`${hostUrl}/allbooks`)
      .pause(2000)
      .assert.visible('input[type=search]')
      .setValue('input[type=search]', 'every')
      .pause(1500)
      .keys(browser.Keys.ENTER)
      .pause(1000)
      .waitForElementVisible('#toast-container', 2000)
      .assert.visible('#toast-container')
      .assert.containsText(
        '#toast-container',
        'Books retrieved successfully')
      .assert.visible('.container div h3', '3 Results for every')
      .moveToElement('.row', 20, 20)
      .assert.visible('.book-info')
      .assert.visible('.book-title span', 'Eat Pray Love')
      .assert.visible('.book-author span', 'by Elizabeth Gilbert')
      .setValue('input[type=search]', 'Andela')
      .pause(1500)
      .keys(browser.Keys.ENTER)
      .pause(1000)
      .assert.visible('#toast-container')
      .assert.containsText(
        '#toast-container',
        'No book matches your search. Try some other combinations')
      .assert.visible('.container div h3', '0 Results for Andela')
      .assert.elementNotPresent('.card')
      .pause(1000)
  },

  AllBooks: (browser) => {
    browser
      .url(`${hostUrl}/allbooks`)
      .pause(2000)
      .assert.elementNotPresent('no-books')
      .assert.visible('#allbooks-list')
      .assert.visible('.pagination')
      .pause(1000)
  },

  Favorite: (browser) => {
      browser
        .url(`${hostUrl}/favorite`)
        .pause(2000)
        .assert.visible('.container')
        .assert.containsText('.container', 'Favorite List is empty')
        .pause(2000)
        .back()
        .assert.urlEquals(`${hostUrl}/allbooks`)
        .pause(2000)
        .click('.card')
        .pause(3000)
        .assert.visible('.section1')
        .assert.containsText('.material-icons.pencil.medium', 'favorite')
        .click('.section1 > div > a', () => {
          browser.pause(1000)
        })
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .pause(1000)
        .click('.section1 > div > a', () => {
          browser.pause(1000)
        })
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .pause(1000)
        .assert.elementNotPresent('.favorite')
        .moveToElement('a.dropdown-button', 30, 30)
        .pause(1000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Favorite Books')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/favorite"]')
        .pause(2000)
        .assert.urlEquals(`${hostUrl}/favorite`)
        .assert.visible('div div div h3', ' My Favorites Books ')
        .assert.visible('.card.favorite-card')
      browser.elements('css selector', '.card.favorite-card', (result) => {
        browser.assert.equal(result.value.length, 1);
      })
        .assert.visible('.card-image')
        .assert.visible('.card-content')
        .assert.visible('.card-action')
        .assert.elementNotPresent('Favorite List is empty')
        .assert.elementNotPresent('.pagination')
        .moveToElement('#delete-favorite', 30, 30)
        .click('#delete-favorite')
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
        .assert.visible('.container')
        .assert.containsText('.container', 'Favorite List is empty')
        .pause(3000)
    },

  BookDetails:
    (browser) => {
      browser
        .url(`${hostUrl}/allbooks`)
        .pause(2000)
        .click('.card')
        .pause(2000)
        .assert.visible('.book-detail.center-align')
        .assert.visible('.book-detail.center-align #title')
        .assert.visible('.detail')
        .assert.visible('.book-container')
        .assert.visible('.book-container > div > div > img')
        .assert.attributeContains('img', 'width', '250')
        .assert.visible('.section1')
        .assert.containsText('.waves-effect.waves-light.btn', 'BORROW')
        .assert.containsText('.material-icons.pencil.medium', 'favorite')
        .assert.visible('.section2')
        .assert.containsText('.section2 span', 'Quantity In Stock:')
        .assert.containsText('.section2 #availabilty', 'Available')
        .assert.visible('.section3')
        .assert.containsText('.section3 i', 'create')
        .assert.visible('.section.tab')
        .assert.containsText('#tab li:nth-child(1)', 'ABOUT THE AUTHOR')
        .assert.containsText('#tab li:nth-child(2)', 'OVERVIEW')
        .moveToElement('#review-area', 30, 30)
        .assert.visible('#review-area')
        .assert.containsText('#review-area #review', 'Reviews')
        .assert.containsText('#review-area a', 'View all')
        .assert.containsText('#review-area > a:nth-child(3)', 'Write your review')
        .moveToElement('.section.similar', 30, 30)
        .assert.visible('.section.similar')
        .assert.containsText('.section.similar', 'You may also be interested in...')
      browser.elements('css selector', '#my-carousel', (result) => {
        browser.assert.equal(result.value.length, 1);
      })
        .pause(4000);
    },

  Vote:
    (browser) => {
      browser
        .url(`${hostUrl}/allbooks`)
        .pause(2000)
        .click('.card')
        .pause(2000)
        .moveToElement('.section3', 30, 30)
        .assert.visible('.section3')
        .assert.containsText('.section3 i', 'create')
        .click('.section3 a:nth-child(2)', () => {
          browser
            .pause(2000)
            .waitForElementVisible('#toast-container', 2000)
            .assert.visible('#toast-container')
            .pause(2000)
        })
        .click('.section3 a:nth-child(2)', () => {
          browser.pause(1000)
        })
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .pause(4000)
        .click('.section3 #voted', () => {
          browser.pause(1000)
        })
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .pause(4000)
    },

  Review:
    (browser) => {
      browser
        .url(`${hostUrl}/allbooks`)
        .pause(2000)
        .execute(() => {
          const el = document.querySelectorAll('.btn.test-btn')
          el[0].click()
            .pause(10000)
        })
        .pause(5000)
        .moveToElement('#review-area', 50, 50)
        .assert.containsText('#review-area p', 'Be the first to post a review')
        .click('#review-area a:nth-child(3)', () => {
          browser.pause(1000)
        })
        .setValue('input[id="caption"]', 'captionn caption')
        .pause(500)
        .setValue('textarea[id="content"]', 'content content conten')
        .pause(500)
        .click('form button', () => {
          browser
            .pause(2000)
            .waitForElementVisible('#toast-container', 2000)
            .assert.visible('#toast-container')
            .assert.containsText(
              '#toast-container',
              'Review has been posted'
            )
        })
        .pause(5000)
        .assert.visible('a#view-all-reviews.write-review')
        .click('a#view-all-reviews.write-review', () => {
          browser.pause(10000)
        })
        .pause(10000)
        .assert.visible('#review-list')
        .assert.visible('#reviewee-image')
        .assert.visible('#reviewee-name')
        .moveToElement('#review-list', 30, 30)
        .assert.visible('.right')
        .moveToElement('.right', 30, 30)
        .assert.visible('#review-action-edit')
        .assert.visible('#review-action-delete')
        .moveToElement('#review-action-edit', 30, 30)
        .click('#review-action-edit', () => {
          browser
            .pause(6000)
        })
        .pause(6000)
        .waitForElementVisible('input[id="caption"]', 6000)
        .waitForElementVisible('textarea[id="content"]', 6000)
        .assert.visible('input[id="caption"]')
        .assert.visible('textarea[id="content"]')
        .setValue('input[id="caption"]', 'edited')
        .pause(500)
        .setValue('textarea[id="content"]', 'edited content content conten')
        .pause(500)
        .click('#edit-profile', () => {
          browser
            .pause(2000)
            .waitForElementVisible('#toast-container', 2000)
            .assert.visible('#toast-container')
            .assert.containsText(
              '#toast-container',
              'Your review has been updated'
            )
        })
        .click('#review-action-delete')
        .pause(3000);
    },


  ProfileView:
    (browser) => {
      browser
        .url(`${hostUrl}/profile`)
        .pause(2000)
        .assert.visible('.profile-bio ')
        .assert.visible('.card-image')
        .pause(20000)
        .assert.containsText('.card-action', "PROFILE SETTING")
        .assert.visible('.card-panel')
        .assert.visible('.container')
        .assert.containsText('.row.center-align', 'Start borrowing books today!!!')
        .assert.elementNotPresent('.bordered.centered.highlight.responsive-table')
        .moveToElement('a.dropdown-button', 30, 30)
        .pause(1000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'All Books')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/allbooks"]')
        .pause(2000)
        .click('.card')
        .pause(2000)
        .moveToElement('#form-lend', 30, 30)
        .assert.containsText('.waves-effect.waves-light.btn', 'BORROW')
        .click('#form-lend a')
        .pause(2000)
        .waitForElementVisible('#toast-container', 2000)
        .assert.visible('#toast-container')
        .moveToElement('a.dropdown-button', 30, 30)
        .pause(1000)
        .click('a.dropdown-button')
        .pause(1000)
        .assert.visible('li a')
        .assert.visible('li a', 'Profile')
        .moveToElement('#dropdown1', 20, 20)
        .click('#dropdown1 li a[href="/profile"]')
        .pause(2000)
        .pause(3000)
        .assert.visible('.responsive-table')
        .assert.visible('.btn-flat')
        .pause(3000);
    },

  ProfileEdit:
    (browser) => {
      browser
        .url(`${hostUrl}/profile`)
        .pause(2000)
        .assert.visible('.profile-bio ')
        .assert.visible('.card-image')
        .click('#edit-user-profile', () => {
          browser
            .pause(6000)
        })
        .pause(5000)
        .waitForElementVisible('input[id="first_name"]', 6000)
        .waitForElementVisible('input[id="last_name"]', 6000)
        .waitForElementVisible('div.file-field.input-field', 6000)
        .assert.visible('input[id="first_name"]')
        .assert.visible('input[id="last_name"]')
        .assert.visible('div.file-field.input-field')
        .setValue('input[id="first_name"]', 'firstnamee2e')
        .setValue('input[id="last_name"]', 'lastNamee2e')
        .setValue('div.file-field.input-field',
          path.resolve('../../Downloads/404-page-error.png'))
        .click('form button', () => {
          browser
            .pause(2000)
            .waitForElementVisible('#toast-container', 2000)
            .assert.visible('#toast-container')
        })
        .pause(2000)
        .assert.urlEquals(`${hostUrl}/profile`)
    },


  Logout: (browser) => {
    browser
      .url(`${hostUrl}/profile`)
      .pause(2000)
      .moveToElement('a.dropdown-button', 30, 30)
      .pause(1000)
      .click('a.dropdown-button')
      .pause(1000)
      .assert.visible('li a')
      .assert.visible('li a', 'Log Out')
      .moveToElement('#dropdown1', 20, 20)
      .click('#dropdown1 li a[href="/"]')
      .pause(2000)
      .assert.urlEquals(`${hostUrl}/`)
      .end()
  },
};