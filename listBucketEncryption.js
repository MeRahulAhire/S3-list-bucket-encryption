const AWS = require('aws-sdk');
const s3 = new AWS.S3();

s3.listBuckets(function(err, data) {
	if (err) console.log(err, err.stack);
	let bucketData = data.Buckets;
	let bucketLength = data.Buckets.length;

	for (let i = 0; i < bucketLength; i++) {
		var params = {
			Bucket: `${bucketData[i].Name}` /* required */
		};
		s3.getBucketEncryption(params, function(err, data) {
			try {                                        // first it will print all non encypted buckets and then vice versa
				if(err){
					console.log(bucketData[i].Name)   // Non Encrypted Bucket List
				}
				if (data) {
					console.log(bucketData[i].Name);  // Encrpted Bucket List 
				}
			} catch (err) {}
		});
	}
});