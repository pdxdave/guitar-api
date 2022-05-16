require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE)

  function eatShit(data){
    return data.map(item => {
        let image = item.image.url 
        return {...item, image}
    })
  }
  exports.handler = async (event, context) => {
    const {id} = event.queryStringParameters 
    if(id){
      try {
          const product = await airtable.retrieve(id)
          if(product.error){
              return {
                  headers: {
                      'Access-Control-Allow-Origin': '*'
                  },
                  statusCode: 404,
                  body: `No product with id: ${id}`
              }
          }
          return {
              headers: {
                  'Access-Control-Allow-Origin': '*'
              },
              statusCode: 200,
              body: JSON.stringify(eatShit(product))
          }
      } catch (error) {
          return {
              headers: {
                  'Access-Control-Allow-Origin': '*'
              },
              statusCode: 500,
              body:  `Server Error`
          }
      }
  }
  return {
      headers: {
          'Access-Control-Allow-Origin': '*'
      },
      statusCode: 400,
      body:  `Please provide product id`
  }
}