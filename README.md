# gimme

personal file dropbox with lambda and s3

## html component

put upload.js and index.html up somewhere. I'm using an s3 bucket hosted at `https://gimme.monks.co`

## s3 component

make an s3 bucket for uploads to go into.

give the s3 bucket a cors like this (the AllowedOrigin is where index.html is hosted):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <CORSRule>
    <AllowedOrigin>https://gimme.monks.co</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

## lambda component

edit package.json and run `npm start` to make a lambda function to handle pre-signing the s3 uploads

give that lambda function a policy like this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1458531615000",
      "Effect": "Allow",
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:ListMultipartUploadParts",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectVersionAcl"
      ],
      "Resource": [
        "arn:aws:s3:::u.monks.co",
        "arn:aws:s3:::u.monks.co/*"
      ]
    }
  ]
}
```

## javascript library

If you want, you can use upload.js in your own biz for client-side s3 uploading.

You'll want to construct it with one argument: a config object with three keys.

* `element` is the file input element to watch
* `signatory_url` is the endpoint that generates s3 upload signatures. In this case, the lambda function.
* `logger(html_msg)` is a function that's called with user output in html strings

```javascript
var flash = function (msg) {
  var el = document.getElementById('flash')
  el.innerHTML = msg
}
new Uploader({
  element: document.getElementById('file_input'),
  signatory_url: 'https://5jd1619chd.execute-api.us-east-1.amazonaws.com/prod',
  logger: flash
})
```

## see also

* https://devcenter.heroku.com/articles/s3-upload-node
* https://github.com/claudiajs/claudia

