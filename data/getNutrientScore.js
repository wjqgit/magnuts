var mongojs = require('mongojs'),
    getSpec = require('get_spec.js')

var uri = 'mongodb://localhost/testdb',
    db = mongojs.connect(uri, ['uh', 'test', 'nl'])

var uid = parseInt(process.argv[2]),
    nutrient = process.argv[3],
    timeStart = parseInt(process.argv[4]),
    timeEnd = parseInt(process.argv[5])

function counter(times, timeStart, timeEnd) {
    count = 0
    times.forEach(function(element) {
        if (element.timeIn < timeEnd && element.timeOut > timeStart) {
            count++
        }
    })
    return count
}

function evaluateScore(count, spec, nc, nrv) {
    i = count.length
    result = 0
    if (spec.length != i || nc.length != i) {
        console.log('Error!');
        return
    }
    numerater = 0
    denominator = 0
    while (i--) {
        numberater += count * spec / 100 * nc
        denominator += count * spec / 100
    }
    denominator *= nrv
    result = numerater / denominator
    return result
}


function getNutrientScore(uid, nutrient, timeStart, timeEnd) {
	nutrientScore = 0
    db.uh.find({
        'uid': uid
    }, function(err, docs) {
        if (err) {
            console.log('Error!');
            return
        }
        db.nl.find({
            'categoryId': 1000005
        }, function(err, docs) {
            if (err) {
                console.log('Nutrition Label Not Found!');
                return
            } else if (docs.length > 1) {
                console.log('Multiple Entries Found!');
                return
            }
            //Nutrition Reference Value
            nrv = docs[0][nutrient]
            i = docs.length
            //Array that stores count of each food
            count = []
            //Array that store the amount intaken of each food
            spec = []
            //Array that stores nutrient concentration of each food
            nc = []
            while (i--) {
                j = docs[i].items.length
                while (j--) {
                    barcode = docs[i].items[j].barcode
                    count[j] = counter(docs[i].items[j].times, timeStart, timeEnd)
                    getSpec(barcode, function(err, docs) {
                            if (err) {
                                console.log('Error!');
                                return
                            }
                            spec[j] = docs.total
                            db.test.find({
                                    'barcode': barcode
                                }, function(err, records) {
                                    if (err) {
                                        console.log('Food Not Found In Category');
                                        return
                                    } else if (records.length > 1) {
                                        console.log('Multiple Entries Found!');
                                        return
                                    }
                                    //Category ID
                                    cid = records[0].categoryId
                                    db.nl.find({
                                        'categoryId': cid
                                    }, function(err, records) {
                                        if (err) {
                                            console.log('Nutrition Label Not Found!');
                                            return
                                        } else if (records.length > 1) {
                                            console.log('Multiple Entries Found!');
                                            return
                                        }
                                        nc[j] = records[0][nutrient]
                                    })
                                }
                            })
                    })
					nutrientScore = evaluateScore(count, spec, nc, nrv)
            }
        })

    })
}

