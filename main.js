var aws = require('aws-sdk')

/*
 * Load the S3 information from the environment variables.
 */
var S3_BUCKET = 'u.monks.co'

exports.handler = function (event, context) {
  'use strict'

  console.log('event: ', event)
  // {name, type}

  var s3 = new aws.S3()
  var s3_params = {
    Bucket: S3_BUCKET,
    Key: event.name,
    Expires: 60,
    ContentType: event.type,
    ACL: 'public-read'
  }
  console.log(s3_params)
  s3.getSignedUrl('putObject', s3_params, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      var return_data = {
        signed_request: data,
        url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + event.name
      }
      context.succeed(return_data)
    }
  })
}

