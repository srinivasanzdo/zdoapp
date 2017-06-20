(function () {
    'use strict';

    angular
        .module('app')
        .service('S3UploadService', S3UploadService)

    /** @ngInject */
    S3UploadService.$inject = ['$http', '$q'];
    function S3UploadService($http, $q) {
        // Your Region 
        AWS.config.region = 'ap-south-1';
        //Your AWS IAM user account: accessKeyId and secretAccessKey
        AWS.config.update({ accessKeyId: 'AKIAITH4O4KCYB3FTKOA', secretAccessKey: 'FmVCUO5hN9ooE5Fjf+o/zsHNvYKqgnnvm30PyGCK' });

        // Bucket - has to be your bucket name
        var bucket = new AWS.S3({ params: { Bucket: 'ang-test', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

        this.Upload = Upload;
        this.getImageBase64URL = getImageBase64URL;
        this.listAllS3Data = listAllS3Data;

        function Upload(file) {

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                return result;
            }
            var rString = "zdo_" + randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '_';
            var deferred = $q.defer();

            // Bucket - has to be your bucket name
            var params = { Bucket: 'ang-test', Key: rString + file.name, ContentType: file.type, Body: file };
            var options = {
                // Part Size of 10mb
                partSize: 10 * 1024 * 1024,
                queueSize: 1,
                // Give the owner of the bucket full control
                ACL: 'bucket-owner-full-control'
            };
            var uploader = bucket.upload(params, options, function (err, data) {
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(data);
            });
            uploader.on('httpUploadProgress', function (event) {
                deferred.notify(event);
            });

            return deferred.promise;
        };

        function getImageBase64URL(fileName) {
            var deferred = $q.defer();
            bucket.getObject({ Key: fileName }, function (err, file) {
                if (file) {
                    deferred.resolve(encode(file.Body));
                    //return "data:image/jpeg;base64," + encode(file.Body);
                }
            });
            return deferred.promise;
        };

        function encode(data) {
            var str = data.reduce(function (a, b) { return a + String.fromCharCode(b) }, '');
            return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
        };

        function listAllS3Data() {
            var deferred = $q.defer();
            bucket.listObjects(function (err, data) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(data);
                    deferred.resolve(data);
                    //return data.Contents;
                }
            });
            return deferred.promise;
        }
    }

}());