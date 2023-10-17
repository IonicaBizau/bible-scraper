"use strict";

const scrapeIt = require("scrape-it")

module.exports = class BibleScraper {
    /**
     * BibleScraper
     * Retrieve verses from bible.com/YouVersion. Initializes the `BibleScraper` instance.
     *
     * @name bibleScraper
     * @function
     * @param {Number} translationId The translation id from bible.com.
     */
    constructor (translationId) {
        this.translation_id = translationId
    }


    /**
     * url
     * Returns the Bible url reference from bible.com.
     *
     * @param {String} reference The Bible reference to get the url for.
     * @returns {String} The reference url.
     */
    url (reference) {
        // TODO Validation
        return `https://www.bible.com/bible/${this.translation_id}/${reference}`
    }

    /**
     * verse
     * Fetches the verse.
     *
     * @param {String} ref The Bible.com verse reference.
     * @returns {Promise} A promise resolving the verse object.
     */
    async verse (ref) {
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
    async chapter (ref) {
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

// TODO Add the other translation ids
module.exports.TRANSLATIONS = {
    KJV: 1
  , VULG: 823
  , ICL00D: 1196
  , NR06: 122
}
