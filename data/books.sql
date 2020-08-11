DROP TABLE IF EXISTS books ;
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255),
    isbn VARCHAR(255),
    image_url VARCHAR(1000),
    description VARCHAR(1000),
    bookshelf VARCHAR(255)
);

INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES('Sara D. Knapp', 'The Contemporary Thesaurus of Search Terms and Synonyms', '157356107X', 'http://books.google.com/books/content?id=zYw3sYFtz9kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Whether your search is limited to a single database or is as expansive as all of cyberspace, you wont find the intended results unless you use the words that work. Now in its second edition, Sara Knapp has updated and expanded this invaluable resource. Unlike any other thesaurus available, this popular guide offers a wealth of natural language options in a convenient, A-to-Z format. Its ideal for helping users find the appropriate word or words for computer searches in the humanities, social sciences, and business. The second edition has added more than 9,000 entries to the first edition extensive list. Now, the Thesaurus contains almost 21,000 search entries! New or expanded areas include broader coverage of business terms and humanities-including arts literature, philosophy, religion, and music.','Social Science');
INSERT INTO books (author, title, isbn, image_url, description, bookshelf)
VALUES('Travis Hill', 'Search Terms: Alpha', '15536107X', 'http://books.google.com/books/content?id=mFT_CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE714HPiVzyopol6HYqR0Ov_6OJ6_WLWY4Pqc9dVG7-4YyaqV6us6YPZQZPERXZmYsak1UC9wxQNf4EP7L5IkzB7l9j4a7smAKsXlZWJkxa28bXGsAmA2Bt-N6xZJdRLRCTrMgETp&source=gbs_api', 'College sophomore Tyler Gallagher loves computers, video games, and  Thanksgiving Break. He is timed the arrival of his computer components  with the holiday vacation from school to blast aliens and enemy soldiers  alike on his brand new, high-end gaming computer.  <br> <br>When the parts arrive, it soon becomes apparent that they are not  what he ordered from TechTerritory. Thinking he is the butt of a  practical joke, Tyler plays along, and builds the computer with the  obviously fake components. His annoyance turns to shock when the  computer powers on.  <br> <br>His shock turns to a mix of disbelief and wonder when he learns the  strange &quot;quantum&quot; computer can pull web pages from the near future.  Disbelief and wonder soon become fear and uncertainty when he discovers  the future might not be so bright.', 'Science');