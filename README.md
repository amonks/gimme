# gimme

personal file dropbox with lambda and s3

## html component

put upload.js and index.html up somewhere. I'm using an s3 bucket hosted at `https://gimme.monks.co`

## s3 component

make an s3 bucket for uploads to go into.

give the s3 bucket a cors like this (the AllowedOrigin is where index.html is hosted):

```
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

```
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

## see also

* https://devcenter.heroku.com/articles/s3-upload-node
* https://github.com/claudiajs/claudia

