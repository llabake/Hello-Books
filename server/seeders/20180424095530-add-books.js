
module.exports = {
  up: queryInterface =>
  // Add books
    queryInterface.bulkInsert('Books', [{
      title: 'There was a country' ,
      author: 'Chinua Achebe',
      isbn: 9747018573019,
      publishedYear: 2010,
      description: 'There Was a Country offers us a powerful story interlaced with poetry, of a time of innocence that quickly dissolved into the postcolonial iron years. It is a great gift from one of the giants of the twentieth century, and it will add to the debate on the situation of Africa in the postcolonial moment, seen through the steady eyes of an inspired witness.',
      aboutAuthor: 'Chinua Achebe, often considered his best, is the most widely read book in modern African literature. He won the Man Booker International Prize in 2007.',
      quantity: 7,
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525556908/there%20was%20a%20country.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Every day is for the thief',
      author: 'Teju Cole',
      isbn: 5730192947018,
      publishedYear: 2007,
      description: 'Every Day is for the Thief is a 2007 novel by Nigerian author Teju Cole. The protagonist of the novel, who is unnamed, returns to Lagos after fifteen years in New York City, only to find himself changed by living abroad and confused by the city',
      aboutAuthor: 'Teju Cole was born in the United States in 1975 and raised in Nigeria. He is the author of Every Day Is for the Thief and Open City, which won the PEN/Hemingway Award, the Internationaler Literaturpreis, the Rosenthal Family Foundation Award for Fiction from the American Academy of Arts and Letters, and the New York City Book Award, and was nominated for the National Book Critics Circle Award. His photography has been exhibited in India and the United States. He is Distinguished Writer in Residence at Bard College.',
      quantity: 7,
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525556992/teju%20cole.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Blink' ,
      author: 'Malcolm Gladwell',
      isbn: 7301294701859,
      publishedYear: 2005,
      description: 'Malcolm Gladwell redefined how we understand the world around us. Now, in Blink, he revolutionizes the way we understand the world within. Blink is a book about how we think without thinking, about choices that seem to be made in an instant - in the blink of an eye - that actually aren\'t as simple as they seem. Why are some people brilliant decision makers, while others are consistently inept? Why do some people follow their instincts and win, while others end up stumbling into error? How do our brains really work - in the office, in the classroom, in the kitchen, and in the bedroom? And why are the best decisions often those that are impossible to explain to others? ',
      aboutAuthor: 'Canadian journalist and writer, best known for his unique perspective on popular culture. He adeptly treaded the boundary between popularizer and intellectual.',
      quantity: 7,
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525557033/blink.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Reclaim your heart' ,
      author: 'Yasmin Mogahed',
      isbn: 9780990387688,
      publishedYear: 2015,
      description: 'Reclaim Your Heart is not just a self-help book. It is a manual about the journey of the heart in and out of the ocean of this life. It is a book about how to keep your heart from sinking to the depths of that ocean, and what to do when it does. It is a book about redemption, about hope, about renewal. Every heart can heal, and each moment is created to bring us closer to that transformative return. Reclaim Your Heart is about finding that moment when everything stops and suddenly looks different. It is about finding your own awakening. And then returning to the better, truer, and freer version of yourself. Many of us live our lives, entrapped by the same repeated patterns of heartbreak and disappointment. Many of us have no idea why this happens. Reclaim Your Heart is about freeing the heart from this slavery. It is about the journey in an out of life\'s most deceptive traps. This book was written to awaken the heart and provide a new perspective on love, loss, happiness, and pain. Providing a manual of sorts, Reclaim Your Heart will teach readers how to live in this life without allowing life to own you. It is a manual of how to protect your most prized possession: the heart.',
      aboutAuthor: 'Yasmin Mogahed received her B.S. Degree in Psychology and her Masters in Journalism and Mass Communications from the University of Wisconsin-Madison. After completing her graduate work, she taught Islamic Studies and served as a youth coordinator. She also worked as a writing instructor at Cardinal Stritch University and a staff columnist for the Islam section of InFocus News. Currently she’s an instructor for AlMaghrib Institute, a writer for the Huffington Post, an international speaker, and author, where she focuses most of her work on spiritual and personal development. Yasmin recently released the New Edition of her book, Reclaim Your Heart, which is now available worldwide. Visit her website, yasminmogahed.com, where you can find a collection of her articles, poetry, and lectures.',
      quantity: 7,
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525557067/Reclaim%20your%20heart.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Fine Boys',
      author: 'Imaseun Egbosa',
      publishedYear: 2012,
      isbn: 7698102987364,
      quantity: 7,
      description: 'Youth juvenile deliquency',
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525557110/fine%20boys.jpg',
      aboutAuthor: 'Great Author',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Productive Muslim',
      author: 'mohammed farris',
      publishedYear: 2015,
      isbn: 9674352817652,
      quantity: 6,
      description: 'this book is for the productive muslims',
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525557153/productive%20muslim.jpg',
      aboutAuthor: 'mo farris is a great author',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Everything Good Will Come',
      author: 'Sefi Atta',
      publishedYear: 2011,
      isbn: 1566565707123,
      quantity: 6,
      description: 'About a girl growing into a woman in postcolonial Nigeria and England. It was published by Interlink World Fiction in 2005',
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525557195/everythin-good.jpg',
      aboutAuthor: 'Sefi Atta is a Nigerian',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Eat Pray Love',
      author: 'Elizabeth Gilbert',
      publishedYear: 2010,
      isbn: 9789023462880,
      quantity: 6,
      description: 'A celebrated writer\'s irresistible, candid, and eloquent account of her pursuit of worldly pleasure, spiritual devotion, and what she really wanted out of life. Around the time Elizabeth Gilbert turned thirty, she went through an early-onslaught midlife crisis. She had everything an educated, ambitious American woman was supposed to want—a husband, a house, a successful career. But instead of feeling happy and fulfilled, she was consumed with panic, grief, and confusion. She went through a divorce, a crushing depression, another failed love, and the eradication of everything she ever thought she was supposed to be.',
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1525778921/Eat%20pray%20love.jpg',
      aboutAuthor: 'Elizabeth Gilbert is an award-winning writer of both fiction and non-fiction. Her short story collection Pilgrims was a finalist for the PEN/Hemingway award, and her novel Stern Men was a New York Times notable book. Her 2002 book The Last American Man was a finalist for both the National Book Award and the National Book Critic’s Circle Award. Her memoir, Eat, Pray, Love, spent 57 weeks in the #1 spot on the New York Times paperback bestseller list. It has shipped over 6 million copies in the US and has been published in over thirty languages. A film adaptation of the book was released by Columbia Pictures with an all star cast: Julia Roberts as Gilbert, Javier Bardem as Felipe, James Franco as David, Billy Crudup as her ex-husband and Richard Jenkins as Richard from Texas.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Never Eat Alone',
      author: 'Keith Ferrazzi',
      publishedYear: 2010,
      isbn: 9780385346658,
      quantity: 6,
      description: 'Do you want to get ahead in life? Climb the ladder to personal success? The secret, master networker Keith Ferrazzi claims, is in reaching out to other people. As Ferrazzi discovered in early life, what distinguishes highly successful people from everyone else is the way they use the power of relationships—so that everyone wins. In Never Eat Alone, Ferrazzi lays out the specific steps—and inner mindset—he uses to reach out to connect with the thousands of colleagues, friends, and associates on his contacts list, people he has helped and who have helped him. And in the time since Never Eat Alone was published in 2005, the rise of social media and new, collaborative management styles have only made Ferrazzi’s advice more essential for anyone hoping to get ahead in business.',
      image: 'http://res.cloudinary.com/sardaunan/image/upload/v1520868439/never%20eat%20alone.jpg',
      aboutAuthor: 'KEITH FERRAZZI is founder and CEO of the training and consulting company Ferrazzi Greenlight and a contributor to Inc., the Wall Street Journal, and Harvard Business Review. Earlier in his career, he was CMO of Deloitte Consulting and at Starwood Hotels and Resorts, and CEO of YaYa Media. He lives in Los Angeles',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Books', null, {})
};
