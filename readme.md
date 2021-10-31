# File Metadata

[femto-metadata](#) is a simple full stack app that accepts images, uploads to cloudinary and returns its metadata. This project idea was gotten from [freeCodeCamp](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/file-metadata-microservice).

### Resources

- Upload an image <#/api/fileanalyse>

#### Upload a file

A post request is made to <#/api/fileanalyse> with the upload file in the file property of the request object. If the file is absent a 400 error is returned. If the file is present a 200 status code is returned with a json object containing the file name, type, size and cloudinary url is returned.

##### Sample return

- If the file was present and upload was successful

```json
{
  "name": "image name",
  "type": "image size",
  "size": "image size in bytes",
  "img": "secure cloudinary link"
}
```

- if the image is absent

```json
{
  "msg": "file not found"
}
```

### Feedback!!

I'd love your feedback on the API. You can reach me via [email](mailto:chinaemerema@gmail.com) or give me a shout out on [twitter](https://twitter.com/femto_ace?t=nk6ylNm1Zp2l0yiJkCKFeA&s=09)
