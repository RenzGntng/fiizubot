const fs = require('fs');

let _ratings = JSON.parse(fs.readFileSync('./database/fiibot_ratings.json'));
let _raters = JSON.parse(fs.readFileSync('./database/fiibot_rater.json'));
let one_star = JSON.parse(fs.readFileSync('./database/fiibot_ratingsOne.json'));
let two_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsTwo.json'));
let three_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsThree.json'));
let four_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsFour.json'));
let five_stars = JSON.parse(fs.readFileSync('./database/fiibot_ratingsFive.json'));

    function FiibotRater(fiibot_stars, sender, rting) {
        var fiibotratings = null
            var pos = null
            Object.keys(rting).forEach((i) => {
                if (rting[i].rater === sender) {
                    fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                rting.push({rater: sender, value: [{fiibot_stars: fiibot_stars, total_rating: 0}]})
                fs.writeFileSync('./database/fiibot_rater.json', JSON.stringify(rting, null, 2));
                Object.keys(rting).forEach((i) => {
                    if (rting[i].rater === sender) {
                        fiibotratings = i
                    }
                })
            }
            if (fiibotratings !== null) {
                Object.keys(rting[fiibotratings].value).forEach((i) => {
                    if (rting[fiibotratings].value[i].fiibot_stars === fiibot_stars) {
                        pos = i
                    }
                })
                if (pos === null) {
                    rting[fiibotratings].value.push({fiibot_stars: fiibot_stars, total_rating: 1})
                    fs.writeFileSync('./database/fiibot_rater.json', JSON.stringify(rting, null, 2));
                } else {
                    rting[fiibotratings].value[pos].total_rating += 1
                    fs.writeFileSync('./database/fiibot_rater.json', JSON.stringify(rting, null, 2));
                }
            }
        }

    function FiibotRatings(fiibot_stars, sender, _stars) {
        FiibotRater(fiibot_stars, sender, _raters)
            var fiibotratings = null
            Object.keys(_stars).forEach((i) => {
                if (_stars[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                _stars.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratings.json',JSON.stringify(_stars, null, 2));
            } else {
                _stars[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratings.json',JSON.stringify(_stars, null, 2));
            }
        }
        
    function FiibotRatingsOne(fiibot_stars, sender, one_star) {
        var fiibotratings = null
            Object.keys(one_star).forEach((i) => {
                if (one_star[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                one_star.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratingsOne.json',JSON.stringify(one_star, null, 2));
            } else {
                one_star[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratingsOne.json',JSON.stringify(one_star, null, 2));
            }
        }
        
    function FiibotRatingsTwo(fiibot_stars, sender, two_stars) {
        var fiibotratings = null
            Object.keys(two_stars).forEach((i) => {
                if (two_stars[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                two_stars.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratingsTwo.json',JSON.stringify(two_stars, null, 2));
            } else {
                two_stars[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratingsTwo.json',JSON.stringify(two_stars, null, 2));
            }
        }
        
    function FiibotRatingsThree(fiibot_stars, sender, three_stars) {
        var fiibotratings = null
            Object.keys(three_stars).forEach((i) => {
                if (three_stars[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                three_stars.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratingsThree.json',JSON.stringify(three_stars, null, 2));
            } else {
                three_stars[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratingsThree.json',JSON.stringify(three_stars, null, 2));
            }
        }
        
    function FiibotRatingsFour(fiibot_stars, sender, four_stars) {
        var fiibotratings = null
            Object.keys(four_stars).forEach((i) => {
                if (four_stars[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                four_stars.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratingsFour.json',JSON.stringify(four_stars, null, 2));
            } else {
                four_stars[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratingsFour.json',JSON.stringify(four_stars, null, 2));
            }
        }
        
    function FiibotRatingsFive(fiibot_stars, sender, five_stars) {
        var fiibotratings = null
            Object.keys(five_stars).forEach((i) => {
                if (five_stars[i].fiibot_stars === fiibot_stars) {
                   fiibotratings = i
                }
            })
            if (fiibotratings === null) {
                five_stars.push({fiibot_stars: fiibot_stars, total_rating: 1})
                fs.writeFileSync('./database/fiibot_ratingsFive.json',JSON.stringify(five_stars, null, 2));
            } else {
                five_stars[fiibotratings].total_rating += 1
                fs.writeFileSync('./database/fiibot_ratingsFive.json',JSON.stringify(five_stars, null, 2));
            }
        }
        
module.exports = {
FiibotRater,
FiibotRatings,
FiibotRatingsOne,
FiibotRatingsTwo,
FiibotRatingsThree,
FiibotRatingsFour,
FiibotRatingsFive
}