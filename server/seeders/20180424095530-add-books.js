
module.exports = {
  up: queryInterface =>
  // Add books
    queryInterface.bulkInsert('Books', [{
      title: 'There was a country' ,
      author: 'Chinua Achebe',
      isbn: 2947018573019,
      publishedYear: 2010,
      description: 'There Was a Country offers us a powerful story interlaced with poetry, of a time of innocence that quickly dissolved into the postcolonial iron years. It is a great gift from one of the giants of the twentieth century, and it will add to the debate on the situation of Africa in the postcolonial moment, seen through the steady eyes of an inspired witness.',
      aboutAuthor: 'Chinua Achebe, often considered his best, is the most widely read book in modern African literature. He won the Man Booker International Prize in 2007.',
      quantity: 7,
      image: 'https://www.worldliteraturetoday.org/2013/march/there-was-country-personal-history-biafra-chinua-achebe',
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
      image: 'https://africainwords.com/2014/04/03/book-review-teju-coles-every-day-is-for-the-thief/',
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
      image: 'http://cronkitehhh.jmc.asu.edu/blog/2012/12/leadership-book-review-blink-malcolm-gladwell/',
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
      image: 'https://www.amazon.co.uk/Reclaim-Your-Heart-Yasmin-Mogahed/dp/0985751207',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Books', null, {})
};
