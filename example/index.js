"use strict";

const BibleScraper = require("../lib");

(async () => {
    // Create a Vulgata Latina instance
    const VulgataLatina = new BibleScraper(BibleScraper.TRANSLATIONS.VULG)
    const verse = await VulgataLatina.verse("1CO.13.4")
    console.log(verse)
    // => { content:
    //      'Caritas patiens est, benigna est. Caritas non æmulatur, non agit perperam, non inflatur',
    //     reference: 'ad Corinthios I 13:4 VULG' }

    // Create a KJV instance
    const kjv = new BibleScraper(BibleScraper.TRANSLATIONS.KJV)
    kjv.verse("1CO.13.4").then(console.log)
    // => { content:
    //     'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up',
    //    reference: '1 Corinthians 13:4 KJV' }

    // Create a NIV instance
    const niv = new BibleScraper(111)
    console.log(await niv.chapter("1CO.13"))
    // => { verses:
    //    [ { content:
    //         'If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal.',
    //        reference: '1CO.13.1' },
    //      { content:
    //         'If I have the gift of prophecy and can fathom all mysteries and all knowledge, and if I have a faith that can move mountains, but do not have love, I am nothing.',
    //        reference: '1CO.13.2' },
    //        ...
    //      { content:
    //         'And now these three remain: faith, hope and love. But the greatest of these is love.',
    //        reference: '1CO.13.13' } ] }
})()
