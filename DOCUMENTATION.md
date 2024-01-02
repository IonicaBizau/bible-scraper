## Documentation

You can see below the API reference of this module.

### BibleScraper

Retrieves verses from bible.com, provided by YouVersion. Initializes the `BibleScraper` instance.

#### Params

- **Number** `translationId`: - The translation id from bible.com.

### constructor

Constructor for the class.

#### Params

- **type** `translationId`: - the ID of the Bible translation.

### `url(reference)`
Returns the Bible url reference from bible.com.

#### Params

- **String** `reference`: The Bible reference to get the url for.

#### Return
- **String** The reference url.

### `getBibleReference(params, params.book, params.chapter, [params.verseNumStart], [params.verseNumEnd])`
Generates a bible reference based on the provided book, chapter, and verse range.

#### Params

- **Object** `params`: - The parameters object.
- **string** `params.book`: - The name of the book.
- **number** `params.chapter`: - The chapter number.
- **number** `[params.verseNumStart]`: - The starting verse number (optional).
- **number** `[params.verseNumEnd]`: - The ending verse number (optional).

#### Return
- **string** The generated bible reference.

verse
Fetches the verse.

#### Params

- **String** `ref`: The Bible.com verse reference.

#### Return
- **Promise** A promise resolving the verse object.

chapter
Fetches the chapter verses.

#### Params

- **String** `ref`: The Bible.com chapter reference.

#### Return
- **Promise** A promise resolving the chapter object.

### BibleScraper.BOOKS

The available books from bible.com.

### BibleScraper.TRANSLATIONS

The translation ID's from bible.com.

