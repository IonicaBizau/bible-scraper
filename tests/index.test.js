const BibleScraper = require('../lib/index.js');

describe('BibleScraper', () => {
  const translationId = BibleScraper.TRANSLATIONS.KJV;

  describe('url', () => {
    it('should return the correct URL for a given reference', () => {
      const bibleScraper = new BibleScraper(translationId);
      const reference = 'GEN.1';
      const expectedUrl = `https://www.bible.com/bible/${translationId}/${reference}`;

      const url = bibleScraper.url(reference);

      expect(url).toBe(expectedUrl);
    });
  });

  describe('getBibleReference', () => {
    it('should generate the correct bible reference', () => {
      const bibleScraper = new BibleScraper(translationId);
      const params = {
        book: 'Genesis',
        chapter: 1,
        verseNumStart: 1,
        verseNumEnd: 3,
      };
      const expectedReference = `GEN.1.1-3.${translationId}`;

      const reference = bibleScraper.getBibleReference(params);

      expect(reference).toBe(expectedReference);
    });

    it('should handle optional verseNumEnd', () => {
      const bibleScraper = new BibleScraper(translationId);
      const params = {
        book: 'Genesis',
        chapter: 1,
        verseNumStart: 1,
      };
      const expectedReference = `GEN.1.1.${translationId}`;

      const reference = bibleScraper.getBibleReference(params);

      expect(reference).toBe(expectedReference);
    });

    it('should log a warning for invalid book name', () => {
      const bibleScraper = new BibleScraper(translationId);
      const params = {
        book: 'InvalidBook',
        chapter: 1,
        verseNumStart: 1,
        verseNumEnd: 3,
      };

      const consoleWarnSpy = jest.spyOn(console, 'warn');
      bibleScraper.getBibleReference(params);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Please provide a valid book name using the `BibleScraper.BOOKS` array.'
      );
    });

    it('should log a warning for missing chapter number', () => {
      const bibleScraper = new BibleScraper(translationId);
      const params = {
        book: 'Genesis',
        verseNumStart: 1,
        verseNumEnd: 3,
      };

      const consoleWarnSpy = jest.spyOn(console, 'warn');
      bibleScraper.getBibleReference(params);

      expect(consoleWarnSpy).toHaveBeenCalledWith('Please provide a chapter number.');
    });
  });

  describe('verse', () => {
    it('should fetch the verse from bible.com', async () => {
      const bibleScraper = new BibleScraper(translationId);
      const reference = 'GEN.1.1';
      const expectedVerse = {
        content: 'In the beginning God created the heaven and the earth.',
        reference: 'Genesis 1:1 KJV',
      };

      const verse = await bibleScraper.verse(reference);

      expect(verse).toEqual(expectedVerse);
    });
  });

  describe('chapter', () => {
    it('should fetch the chapter verses from bible.com', async () => {
      const bibleScraper = new BibleScraper(translationId);
      const reference = 'GEN.1';
      const expectedChapter = {
        "verses": [
          {
            "content": "In the beginning God created the heaven and the earth.",
            "reference": "GEN.1.1"
          },
          {
            "content": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
            "reference": "GEN.1.2"
          },
          {
            "content": "And God said, Let there be light: and there was light.",
            "reference": "GEN.1.3"
          },
          {
            "content": "And God saw the light, that it was good: and God divided the light from the darkness.",
            "reference": "GEN.1.4"
          },
          {
            "content": "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
            "reference": "GEN.1.5"
          },
          {
            "content": "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
            "reference": "GEN.1.6"
          },
          {
            "content": "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
            "reference": "GEN.1.7"
          },
          {
            "content": "And God called the firmament Heaven. And the evening and the morning were the second day.",
            "reference": "GEN.1.8"
          },
          {
            "content": "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
            "reference": "GEN.1.9"
          },
          {
            "content": "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
            "reference": "GEN.1.10"
          },
          {
            "content": "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.",
            "reference": "GEN.1.11"
          },
          {
            "content": "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.",
            "reference": "GEN.1.12"
          },
          {
            "content": "And the evening and the morning were the third day.",
            "reference": "GEN.1.13"
          },
          {
            "content": "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:",
            "reference": "GEN.1.14"
          },
          {
            "content": "and let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",
            "reference": "GEN.1.15"
          },
          {
            "content": "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
            "reference": "GEN.1.16"
          },
          {
            "content": "And God set them in the firmament of the heaven to give light upon the earth,",
            "reference": "GEN.1.17"
          },
          {
            "content": "and to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
            "reference": "GEN.1.18"
          },
          {
            "content": "And the evening and the morning were the fourth day.",
            "reference": "GEN.1.19"
          },
          {
            "content": "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",
            "reference": "GEN.1.20"
          },
          {
            "content": "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.",
            "reference": "GEN.1.21"
          },
          {
            "content": "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.",
            "reference": "GEN.1.22"
          },
          {
            "content": "And the evening and the morning were the fifth day.",
            "reference": "GEN.1.23"
          },
          {
            "content": "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.",
            "reference": "GEN.1.24"
          },
          {
            "content": "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.",
            "reference": "GEN.1.25"
          },
          {
            "content": "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
            "reference": "GEN.1.26"
          },
          {
            "content": "So God created man in his own image, in the image of God created he him; male and female created he them.",
            "reference": "GEN.1.27"
          },
          {
            "content": "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
            "reference": "GEN.1.28"
          },
          {
            "content": "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
            "reference": "GEN.1.29"
          },
          {
            "content": "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.",
            "reference": "GEN.1.30"
          },
          {
            "content": "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day.",
            "reference": "GEN.1.31"
          }
        ]
      }

      const chapter = await bibleScraper.chapter(reference);

      expect(chapter).toEqual(expectedChapter);
    });
  });
});
