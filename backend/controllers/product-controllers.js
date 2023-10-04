var products = null;
var colors = null;

const fs = require('fs');
const path = require('path');
const fileName = path.join(__dirname, '../models/products.json');
const colorFile = path.join(__dirname, '../models/colors.json');

(function () {
  let productsStr = fs.readFileSync(fileName, { encoding: "utf-8" })
  products = JSON.parse(productsStr)
  let colorsStr = fs.readFileSync(colorFile, { encoding: "utf-8" })
  colors = JSON.parse(colorsStr)
})()

const getAllColors = (req, res, next) => {
  res.json(colors)
}

const getAllProducts = (req, res, next) => {
  res.json(products)
}

const getProduct = (req, res, next) => {
  const product = products.find((item) => {
    return item._id === req.params.id
  })

  res.json(product)
}

const createProduct = (req, res, next) => {
  let id = Date.now().toString()
  const add = [{
    _id: id,
    title: req.body.title ? req.body.title : "",
    image: req.body.image ? req.body.image : "",
    description: req.body.description ? req.body.description : "",
    detected: req.body.detected ? req.body.detected : "",
    object: req.body.object ? req.body.object : "",
    color: req.body.color ? req.body.color : "",
    vehicle: req.body.vehicle ? req.body.vehicle : "",
    relative: req.body.relative ? req.body.relative : []
  }]
  let temp = products.concat(add)
  let newPosts = temp
  if (req.body.relative.length > 0) {
    newPosts = temp.map((item) => {

      if (req.body.relative.includes(item._id)) {
        if (item.object === "person") {
          item.relative = [id]
        } else if (req.body.object === "vehicle") {
          item.relative.push(id)
        }
      }
      return item;
    })
  }
  try {
    fs.writeFile(fileName, JSON.stringify(newPosts), function (err) {
      if (err) {
        console.log(err)
        res.json(500)
      }
      else {
        res.json(200)
      }
    });
  } catch (error) {
    res.json(401)
  }
}

const updateProduct = (req, res, next) => {
  const _products = products.filter((item) => {
    if (item._id === req.params.id) {
      item.title = req.body.title
      item.detected = req.body.detected
      item.description = req.body.description
    }
    return item;
  })
  try {
    fs.writeFile(fileName, JSON.stringify(_products), function (err) {
      if (err) {
        console.log(err)
        res.json(500)
      }
      else {
        res.json(200)
      }
    });
  } catch (error) {
    res.json(401)
  }
}

const deleteProduct = (req, res, next) => {
  const _products = products.filter((item) => {
    if (item._id !== req.params.id) {
      return item
    }
  })
  try {
    fs.writeFile(fileName, JSON.stringify(_products), function (err) {
      if (err) {
        console.log(err)
        res.json(500)
      }
      else {
        res.json(200)
      }
    });
  } catch (error) {
    res.json(401)
  }
}

const filteredPosts = (req, res, next) => {
  const filters = req.body
  let filtered = products;

  if (filters && filters.dateRange && filters.dateRange.length > 0) {
    let startDate = new Date();
    let startDateSplited = filters.dateRange[0].split("-");
    startDate.setFullYear(parseInt(startDateSplited[0]), parseInt(startDateSplited[1]), parseInt(startDateSplited[2]))
    let startTimeStamp = startDate.getTime()

    let endDate = new Date();
    let endDateSplited = filters.dateRange[1].split("-");
    endDate.setFullYear(parseInt(endDateSplited[0]), parseInt(endDateSplited[1]), parseInt(endDateSplited[2]))
    let endTimeStamp = endDate.getTime()

    filters.dateRange
    filtered = filtered.filter(item => {
      let detected = new Date();
      let detectedSplited = item.detected.split("-");
      detected.setFullYear(parseInt(detectedSplited[0]), parseInt(detectedSplited[1]), parseInt(detectedSplited[2]))
      let detectedTimeStamp = detected.getTime()
      return (startTimeStamp <= detectedTimeStamp && endTimeStamp >= detectedTimeStamp)

    })
  }

  if (filters && filters.objects.length > 0) {
    filtered = filtered.filter(item => {
      return filters.objects.includes(item.object)
    })
  }

  if (filters && filters.colors.length > 0) {
    filtered = filtered.filter(item => {
      return filters.colors.includes(item.color)
    })
  }

  if (filters && filters.vehicles.length > 0) {
    filtered = filtered.filter(item => {
      return filters.vehicles.includes(item.vehicle)
    })
  }

  totalRecords = filtered.length;
  records = filtered.slice(filters.from, filters.size);
  res.json({ records, totalRecords });
}

exports.getAllColors = getAllColors
exports.getAllProducts = getAllProducts
exports.getProduct = getProduct
exports.filteredPosts = filteredPosts
exports.updateProduct = updateProduct
exports.deleteProduct = deleteProduct
exports.createProduct = createProduct