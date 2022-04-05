class APIfeatures {
   constructor(query, queryObj) {
      this.query = query
      this.queryObj = queryObj
   }

   filter() {
      // Exclude unwanted fields
      const queryObj = {...this.queryObj}
      const excludedFields = ['sort', 'page', 'limit', 'skip', 'fields']
      excludedFields.forEach(field => delete queryObj[field])

      if (Object.keys(queryObj).length > 0) {
         const queryStr = JSON.stringify(queryObj)
            .replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`)
            .replace(/\s/g, '')

         this.query = this.query.find(JSON.parse(queryStr))
      } else {
         this.query = this.query.find()
      }

      return this
   }

   sort() {
      let sortBy = '-avgRating'

      if (this.queryObj.sort) sortBy = this.queryObj.sort.split(',').join(' ')

      this.query = this.query.sort(sortBy)
      return this
   }

   select() {
      let selectBy = '-__v'

      if (this.queryObj.fields) selectBy = this.queryObj.fields.split(',').join(' ')
      this.query = this.query.select(selectBy)
      return this
   }

   paginate() {
      const page = this.queryObj.page * 1 || 1
      const limit = this.queryObj.limit * 1 || 5

      const skip = (page - 1) * limit

      this.query = this.query.skip(skip).limit(limit)
      return this
   }
}

module.exports = APIfeatures