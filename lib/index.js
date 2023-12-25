"use strict";

const scrapeIt = require("scrape-it")

// Bible version ID's were found on https://www.bible.com/versions.
const ENGLISH_BIBLE_VERSION_IDS = {
    AMP: 1588,
    AMPC: 8,
    ASV: 12,
    BOOKS: 31,
    BSB: 3034,
    CEB: 37,
    CEV: 392,
    CEVDCI: 303,
    CEVUK: 294,
    CJB: 1275,
    CPDV: 42,
    CSB: 1713,
    DARBY: 478,
    DRC1752: 55,
    EASY: 2079,
    ERV: 406,
    ESV: 59,
    FBV: 1932,
    FNVNT: 3633,
    GNBDC: 416,
    GNBDK: 431,
    GNBUK: 296,
    GNT: 68,
    GNTD: 69,
    GNV: 2163,
    GW: 70,
    GWC: 1047,
    HCSB: 72,
    ICB: 1359,
    JUB: 1077,
    KJV: 1,
    KJVAAE: 546,
    KJVAE: 547,
    LEB: 90,
    LSB: 3345,
    MEV: 1171,
    MP1650: 1365,
    MP1781: 3051,
    MSG: 97,
    NABRE: 463,
    NASB1995: 100,
    NASB2020: 2692,
    NCV: 105,
    NET: 107,
    NIRV: 110,
    NIV: 111,
    NIVUK: 113,
    NKJV: 114,
    NLT: 116,
    NMV: 2135,
    NRSV: 2015,
    NRSVUE: 3523,
    PEV: 2530,
    RAD: 2753,
    RSV: 2017,
    RSVCI: 3548,
    RV1885: 477,
    RV1895: 1922,
    TCENT: 3427,
    TEG: 3010,
    TLV: 314,
    TOJB2011: 130,
    TPT: 1849,
    TS2009: 316,
    WBMS: 2407,
    WEBBE: 1204,
    WEBUS: 206,
    WMB: 1209,
    WMBBE: 1207,
    YLT98: 821
}

const TRANSLATIONS = {
    VULG: 823,
    ICL00D: 1196,
    NR06: 122,
    ...ENGLISH_BIBLE_VERSION_IDS,
}

module.exports.TRANSLATIONS = TRANSLATIONS;

// Bible book names each have a short code called a USFM code. 
// These can be found here: https://ubsicap.github.io/usfm/identification/books.html
const booksAndUsfmShortcodes = {
    'Genesis': 'GEN',
    'Exodus': 'EXO',
    'Leviticus': 'LEV',
    'Numbers': 'NUM',
    'Deuteronomy': 'DEU',
    'Joshua': 'JOS',
    'Judges': 'JDG',
    'Ruth': 'RUT',
    '1 Samuel': '1SA',
    '2 Samuel': '2SA',
    '1 Kings': '1KI',
    '2 Kings': '2KI',
    '1 Chronicles': '1CH',
    '2 Chronicles': '2CH',
    'Ezra': 'EZR',
    'Nehemiah': 'NEH',
    'Esther': 'EST',
    'Job': 'JOB',
    'Psalms': 'PSA',
    'Psalm': 'PSA',
    'Proverbs': 'PRO',
    'Ecclesiastes': 'ECC',
    'Song of Solomon': 'SNG',
    'Isaiah': 'ISA',
    'Jeremiah': 'JER',
    'Lamentations': 'LAM',
    'Ezekiel': 'EZK',
    'Daniel': 'DAN',
    'Hosea': 'HOS',
    'Joel': 'JOL',
    'Amos': 'AMO',
    'Obadiah': 'OBA',
    'Jonah': 'JON',
    'Micah': 'MIC',
    'Nahum': 'NAM',
    'Habakkuk': 'HAB',
    'Zephaniah': 'ZEP',
    'Haggai': 'HAG',
    'Zechariah': 'ZEC',
    'Malachi': 'MAL',
    'Matthew': 'MAT',
    'Mark': 'MRK',
    'Luke': 'LUK',
    'John': 'JHN',
    'Acts': 'ACT',
    'Romans': 'ROM',
    '1 Corinthians': '1CO',
    '2 Corinthians': '2CO',
    'Galatians': 'GAL',
    'Ephesians': 'EPH',
    'Philippians': 'PHP',
    'Colossians': 'COL',
    '1 Thessalonians': '1TH',
    '2 Thessalonians': '2TH',
    '1 Timothy': '1TI',
    '2 Timothy': '2TI',
    'Titus': 'TIT',
    'Philemon': 'PHM',
    'Hebrews': 'HEB',
    'James': 'JAS',
    '1 Peter': '1PE',
    '2 Peter': '2PE',
    '1 John': '1JN',
    '2 John': '2JN',
    '3 John': '3JN',
    'Jude': 'JUD',
    'Revelation': 'REV'
}

module.exports = class BibleScraper {
    static BOOKS = Object.keys(booksAndUsfmShortcodes);
    static TRANSLATIONS = TRANSLATIONS;

    /**
     * BibleScraper
     * Retrieve verses from bible.com/YouVersion. Initializes the `BibleScraper` instance.
     *
     * @name bibleScraper
     * @function
     * @param {Number} translationId The translation id from bible.com.
     */
    constructor(translationId) {
        if (!translationId) {
            throw new Error('Bible translation ID is required and is available via `BibleScraper.TRANSLATIONS`.')
        }

        this.translation_id = translationId
    }

    /**
     * url
     * Returns the Bible url reference from bible.com.
     *
     * @param {String} reference The Bible reference to get the url for.
     * @returns {String} The reference url.
     */
    url(reference) {
        // TODO Validation
        return `https://www.bible.com/bible/${this.translation_id}/${reference}`
    }

    /**
     * Generates a bible reference based on the provided book, chapter, and verse range.
     *
     * @param {Object} params - The parameters object.
     * @param {string} params.book - The name of the book.
     * @param {number} params.chapter - The chapter number.
     * @param {number} [params.verseNumStart] - The starting verse number (optional).
     * @param {number} [params.verseNumEnd] - The ending verse number (optional).
     * 
     * @return {string} The generated bible reference.
     */
    getBibleReference({ book, chapter, verseNumStart, verseNumEnd }) {
        if (!BibleScraper.BOOKS.includes(book)) {
            console.warn('Please provide a valid book name using the `BibleScraper.BOOKS` array.')
        }

        if (!chapter) {
            console.warn('Please provide a chapter number.')
        }

        let bibleReference = `${booksAndUsfmShortcodes[book]}.${chapter}`;

        if (verseNumStart && verseNumEnd) {
            bibleReference = `${bibleReference}.${verseNumStart}-${verseNumEnd}.${this.translation_id}`;
        } else if (verseNumStart && !verseNumEnd) {
            bibleReference = `${bibleReference}.${verseNumStart}.${this.translation_id}`;
        }

        return bibleReference
    }

    /**
     * verse
     * Fetches the verse.
     *
     * @param {String} ref The Bible.com verse reference.
     * @returns {Promise} A promise resolving the verse object.
     */
    async verse(ref) {
        const { data } = await scrapeIt(this.url(ref), {
            content: {
                selector: "p.text-19",
                eq: 0
            },
            reference: {
                selector: "h2.mbe-2",
                eq: 0
            }
        })
        return data
    }

    /**
     * chapter
     * Fetches the chapter verses.
     *
     * @param {String} ref The Bible.com chapter reference.
     * @returns {Promise} A promise resolving the chapter object.
     */
    async chapter(ref) {
        const { data } = await scrapeIt(this.url(ref), {
            verses: {
                listItem: "span.ChapterContent_verse__57FIw[data-usfm]",
                data: {
                    content: {
                        selector: "span.ChapterContent_content__RrUqA",
                        how: "text"
                    },
                    reference: {
                        attr: "data-usfm"
                    }
                }
            }
        })

        data.verses = (data.verses || []).reduce((acc, c) => {
            const latest = acc[acc.length - 1]
            if (latest && latest.reference === c.reference) {
                latest.content = (latest.content + " " + c.content).trim()
            } else {
                acc.push(c)
            }
            return acc
        }, [])
        return data
    }
}

module.exports.BOOK_NAMES = Object.keys(booksAndUsfmShortcodes)
