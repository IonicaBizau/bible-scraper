## Documentation

You can see below the API reference of this module.

### `bibleScraper(translationId)`
BibleScraper
Retrieve verses from bible.com/YouVersion. Initializes the `BibleScraper` instance.

#### Params

- **Number** `translationId`: The translation id from bible.com.

### `url(reference)`
Returns the Bible url reference from bible.com.

#### Params

- **String** `reference`: The Bible reference to get the url for.

#### Return
- **String** The reference url.

### `verse(ref)`
Fetches the verse.

#### Params

- **String** `ref`: The Bible.com verse reference.

#### Return
- **Promise** A promise resolving the verse object.

### `chapter(ref)`
Fetches the chapter verses.

#### Params

- **String** `ref`: The Bible.com chapter reference.

#### Return
- **Promise** A promise resolving the chapter object.

