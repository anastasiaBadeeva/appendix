const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const downloadData = (url, changeDisabled) => {
  changeDisabled(true);

  const urlArray = url.split('/');
  const bucket = urlArray[2];
  const key = url.slice(url.indexOf(urlArray[3]));
  const fileName = urlArray[urlArray.length - 1];

  const s3 = new AWS.S3({ params: { Bucket: bucket } });
  const params = { Bucket: bucket, Key: key };

  s3.getObject(params, (err, dataStream) => {
    const blob = new Blob([dataStream.Body], {
      type: dataStream.ContentType,
    });
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    changeDisabled(false);
  });
}

  export default downloadData;
