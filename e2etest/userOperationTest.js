const path = require('path');

const hostUrl = 'http://localhost:8080'
export default {
  'User operations': function (browser) {
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
      .pause(4000)
      .assert.containsText('a.dropdown-button', 'e2eusername')
      .pause(500)
  },


  'Search:User should be able to search for books': (browser) => {
    browser
    // .url(`${hostUrl}/allbooks`)
    // .pause(2000)
    // .assert.visible('input[type=search]')
    // .setValue('input[type=search]', 'every')
    // .pause(1500)
    // .keys(browser.Keys.ENTER)
    // .pause(1000)
    // .waitForElementVisible('#toast-container', 2000)
    // .assert.visible('#toast-container')
    // .assert.containsText(
    //   '#toast-container',
    //   'Books retrieved successfully')
    // .assert.visible('.container div h3', '3 Results for every')
    // .moveToElement('.row', 20, 20)
    // .assert.visible('.book-info')
    // .assert.visible('.book-title span', 'Eat Pray Love')
    // .assert.visible('.book-author span', 'by Elizabeth Gilbert')
    // .setValue('input[type=search]', 'Andela')
    // .pause(1500)
    // .keys(browser.Keys.ENTER)
    // .pause(1000)
    // .assert.visible('#toast-container')
    // .assert.containsText(
    //   '#toast-container',
    //   'No book matches your search. Try some other combinations')
    // .assert.visible('.container div h3', '0 Results for Andela')
    // .assert.elementNotPresent('.card')
    // .pause(1000)
  },

  'All Books: User should see all books': (browser) => {
    browser
      .url(`${hostUrl}/allbooks`)
      .pause(2000)
    // .assert.elementNotPresent('no-books')
    // .assert.visible('#book-2')
    // .assert.visible('#book-5')
    // .assert.visible('#book-7')
    // .assert.visible('.pagination')
    // .pause(1000)
  },

  // 'Book Details: users can view book details':
  //   (browser) => {
  //     browser
  //     .url(`${hostUrl}/allbooks`)
  //     .pause(2000)
  //     .click('.card')
  //     .pause(2000)
  //     .assert.urlEquals(`${hostUrl}/book/2`)
  //     .assert.visible('.book-detail.center-align')
  //     .assert.visible('.book-detail.center-align #title')
  //     .assert.visible('.detail')
  //     .assert.visible('.book-container')
  //     .assert.visible('.book-container > div > div > img')
  //     .assert.attributeContains('img', 'width', '250')
  //     .assert.visible('.section1')
  //     .assert.containsText('.waves-effect.waves-light.btn', 'BORROW')
  //     .assert.containsText('.material-icons.pencil.medium', 'favorite')
  //     .assert.visible('.section2')
  //     .assert.containsText('.section2 span', 'Quantity In Stock:')
  //     .assert.containsText('.section2 #availabilty', 'Available')
  //     .assert.visible('.section3')
  //     .assert.containsText('.section3 i', 'create')
  //     // .assert.containsText('.section3 i:nth-child(2)', 'thumb_up')
  //     // .assert.containsText('.section3 i', 'thumb_down')
  //     // .assert.containsText('.section3 i', 'comment')
  //     .assert.visible('.section.tab')
  //     .assert.containsText('#tab li:nth-child(1)', 'ABOUT THE AUTHOR')
  //     .assert.containsText('#tab li:nth-child(2)', 'OVERVIEW')
  //     .moveToElement('#review-area', 30, 30)
  //     .assert.visible('#review-area')
  //     .assert.containsText('#review-area #review', 'Reviews')
  //     .assert.containsText('#review-area a', 'View all')
  //     .assert.containsText('#review-area > a:nth-child(3)', 'Write your review')
  //     .moveToElement('.section.similar', 30, 30)
  //     .assert.visible('.section.similar')
  //     .assert.containsText('.section.similar', 'You may also be interested in...')
  //     browser.elements('css selector','#my-carousel',  (result) =>{
  //       browser.assert.equal(result.value.length, 1);
  //     })
  //     .pause(4000);
  //   },

  // 'Vote: users can upvote or downvote a book':
  //   (browser) => {
  //     browser
  //       .url(`${hostUrl}/allbooks`)
  //       .pause(2000)
  //       .click('.card')
  //       .pause(2000)
  //       .moveToElement('.section3', 30,30)
  //       .assert.visible('.section3')
  //       .assert.containsText('.section3 i', 'create')
  //       .click('.section3 a:nth-child(2)', () => {
  //         browser
  //           .pause(2000)
  //           .waitForElementVisible('#toast-container', 2000)
  //           .assert.visible('#toast-container')
  //           .pause(2000)
  //       })
  //       .click('.section3 a:nth-child(2)', () => {
  //         browser.pause(1000)
  //       })
  //       .waitForElementVisible('#toast-container', 2000)
  //       .assert.visible('#toast-container')
  //       .pause(4000)
  //       .click('.section3 #voted', () => {
  //         browser.pause(1000)
  //       })
  //       .waitForElementVisible('#toast-container', 2000)
  //       .assert.visible('#toast-container')
  //       .pause(4000)
  //   },

  'Review: users can post review on a book':
    (browser) => {
      browser
        .url(`${hostUrl}/allbooks`)
        .pause(2000)
        .click('.card')
        .pause(2000)
        .moveToElement('#review-area', 50, 50)
        // .assert.containsText('#review-area p', 'Be the first to post a review')
        // .click('#review-area a:nth-child(3)', () => {
        //   browser.pause(1000)
        // })
        // .setValue('input[id="caption"]', 'captionn caption')
        // .pause(500)
        // .setValue('textarea[id="content"]', 'content content conten')
        // .pause(500)
        // .click('form button', () => {
        //   browser
        //     .pause(2000)
        //     .waitForElementVisible('#toast-container', 2000)
        //     .assert.visible('#toast-container')
        //     .assert.containsText(
        //       '#toast-container',
        //       'Review has been posted'
        //     )
        // })
        .click('#review-area a', () => {
          browser.pause(1000)
        })
        // .assert.visible('#review-list')
        // .assert.visible('#reviewee-image')
        // .assert.visible('#reviewee-name')
        // .moveToElement('#review-list', 30, 30)
        .assert.visible('.right')
        .moveToElement('.right', 30, 30)
        .assert.visible('#review-action-edit')
        .assert.visible('#review-action-delete')
        // .moveToElement('#review-action-edit', 30, 30)
        .click('.right i:nth-child(1)', () => {
          browser
            .pause(5000)
            .waitForElementVisible('input[id="caption"]', 5000)
            .waitForElementVisible('textarea[id="content"]', 5000)
            .assert.visible('input[id="caption"]')
            .assert.visible('textarea[id="content"]')
        })
        // .pause(6000)
        // .setValue('input[id="caption"]', 'edited')
        // .pause(500)
        // .setValue('textarea[id="content"]', 'edited content content conten')
        // .pause(500)
        // .click('#edit-profile', () => {
        //   browser
        //     .pause(2000)
        //     .waitForElementVisible('#toast-container', 2000)
        //     .assert.visible('#toast-container')
        //     .assert.containsText(
        //       '#toast-container',
        //       'Your review has been updated'
        //     )
        // })
        // .click('#review-action-delete')
        .pause(3000);
    },
  // 'Favorite: users can add a book as favorite and view their favorite list':
  // (browser) => {
  //   browser
  //     .url(`${hostUrl}/favorite`)
  //     .pause(2000)
  //     .assert.visible('.container')
  //     .assert.containsText('.container', 'Favorite List is empty')
  //     .pause(2000)
  //     .back()
  //     .assert.urlEquals(`${hostUrl}/allbooks`)
  //     .pause(2000)
  //     .click('.card')
  //     .pause(2000)
  //     .assert.urlEquals(`${hostUrl}/book/2`)
  //     .assert.visible('.section1')
  //     .assert.containsText('.material-icons.pencil.medium', 'favorite')
  //     .click('.section1 > div > a', () => {
  //       browser.pause(1000)
  //     })
  //     .waitForElementVisible('#toast-container', 2000)
  //     .assert.visible('#toast-container')
  //     .assert.containsText('#toast-container', "'Every day is for the thief' has been added to your favorite list")
  //     .pause(1000)
  //     .click('.section1 > div > a', () => {
  //       browser.pause(1000)
  //     })
  //     .waitForElementVisible('#toast-container', 2000)
  //     .assert.visible('#toast-container')
  //     .assert.containsText('#toast-container',  "'Every day is for the thief' already on your favorite list")
  //     .pause(1000)
  //     .assert.elementNotPresent('.favorite')
  //     .moveToElement('a.dropdown-button', 30, 30)
  //     .pause(1000)
  //     .click('a.dropdown-button')
  //     .pause(1000)
  //     .assert.visible('li a')
  //     .assert.visible('li a', 'Favorite Books')
  //     .moveToElement('#dropdown1', 20, 20)
  //     .click('#dropdown1 li a[href="/favorite"]')
  //     .pause(2000)
  //     .assert.urlEquals(`${hostUrl}/favorite`)
  //     .assert.visible('div div div h3', ' My Favorites Books ')
  //     .assert.visible('.card.favorite-card')
  //     browser.elements('css selector','.card.favorite-card',  (result) =>{
  //       browser.assert.equal(result.value.length, 1);
  //     })
  //     .assert.visible('.card-image')
  //     .assert.visible('.card-content')
  //     .assert.visible('.card-action')
  //     .assert.elementNotPresent('Favorite List is empty')
  //     .assert.elementNotPresent('.pagination')
  //     .moveToElement('#delete-favorite', 30, 30)
  //     .click('#delete-favorite')
  //     .pause(2000)
  //     .assert.visible('.swal-button-container')
  //     .assert.visible('.swal-button--cancel')
  //     .assert.visible('.swal-button--danger')
  //     .click('.swal-button--danger')
  //     .pause(2000)
  //     .assert.visible('.swal-button--confirm')
  //     .pause(3000);
  // },

  // 'Profile: user can view his/her profile':
  // (browser) => {
  //   browser
  //     .url(`${hostUrl}/profile`)
  //     .pause(2000)
  //     .assert.visible('.profile-bio ')
  //     .assert.visible('.card-image')
  //     .assert.containsText('.card-action',  "PROFILE SETTING")
  //     .assert.visible('.card-panel') 
  //     .assert.visible('.container')
  //     .assert.containsText('.row.center-align', 'Start borrowing books today!!!')   
  //     .assert.elementNotPresent('.bordered.centered.highlight.responsive-table')
  //     .moveToElement('a.dropdown-button', 30, 30)
  //     .pause(1000)
  //     .click('a.dropdown-button')
  //     .pause(1000)
  //     .assert.visible('li a')
  //     .assert.visible('li a', 'All Books')
  //     .moveToElement('#dropdown1', 20, 20)
  //     .click('#dropdown1 li a[href="/allbooks"]')
  //     .pause(2000)
  //     .click('.card')
  //     .pause(2000)
  //     .moveToElement('#form-lend', 30, 30)
  //     .assert.containsText('.waves-effect.waves-light.btn', 'BORROW')
  //     .click('#form-lend a')
  //     .pause(2000)
  //     .waitForElementVisible('#toast-container', 2000)
  //     .assert.visible('#toast-container')
  //     .moveToElement('a.dropdown-button', 30, 30)
  //     .pause(1000)
  //     .click('a.dropdown-button')
  //     .pause(1000)
  //     .assert.visible('li a')
  //     .assert.visible('li a', 'Profile')
  //     .moveToElement('#dropdown1', 20, 20)
  //     .click('#dropdown1 li a[href="/profile"]')
  //     .pause(2000)
  //     .pause(3000)
  //     .assert.visible('.responsive-table')
  //     .assert.visible('.btn-flat') 
  //     .pause(3000);

  // },

  // 'Profile: user can edit his/her profile':
  //   (browser) => {
  //     browser
  //       .url(`${hostUrl}/profile`)
  //       .pause(2000)
  //       .assert.visible('.profile-bio ')
  //       .assert.visible('.card-image')
  //       .assert.containsText('.card-action', "PROFILE SETTING")
  //       .click('.card-action')
  //       .assert.visible('input[id="firstName"]')
  //       .assert.visible('input[id="lastName"]')

  //       .assert.visible('div.file-field.input-field')
  //       .setValue('input[id="firstName"]', 'firstnamee2e')
  //       .setValue('input[id="lastName"]', 'lastNamee2e')
  //       .setValue('div.file-field.input-field',
  //         path.resolve('../../Downloads/404-page-error.png'))
  //       .click('form button', () => {
  //         browser
  //           .pause(6000)
  //           .waitForElementVisible('#toast-container', 2000)
  //           .assert.visible('#toast-container')
  //           .assert.containsText(
  //             '#toast-container',
  //             'Your profile has been updated'
  //           )
  //       })
  //       .pause(2000)
  //       .assert.urlEquals(`${hostUrl}/profile`)
  //   }
};