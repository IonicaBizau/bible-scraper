"use strict";

const scrapeIt = require("scrape-it")

module.exports = class BibleScraper {
/**
 * bibleScraper
 * Retrieve verses from bible.com/YouVersion.
 *
 * @name bibleScraper
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
    constructor (translationId) {
        this.translation_id = translationId
    }
    url (reference) {
        // TODO Validation
        return `https://www.bible.com/bible/${this.translation_id}/${reference}`
    }
    verse (ref) {
        return scrapeIt(this.url(ref), {
            content: {
                selector: ".near-black.lh-copy"
              , eq: 0
            }
          , reference: {
                selector: "h1.f6.f5-m.mb3.near-black"
              , eq: 0
            }
        }).then(({ data }) => {
            return data
        })
    }
    chapter (ref) {
        return scrapeIt(this.url(ref), {
            verses: {
                listItem: ".verse[data-usfm]"
              , data: {
                    content: {
                        selector: ".content"
                      , how: "text"
                    }
                  , reference: {
                        attr: "data-usfm"
                    }
                }
            }
        }).then(({ data }) => {
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
        })
    }
}

// TODO Add the other translation ids
module.exports.TRANSLATIONS = {
    KJV: 1
  , VULG: 823
}
