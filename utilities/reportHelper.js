var xml2js = require('xml2js');
var reportUtils = {
    mergeJUnitReports: function(suiteDirectory, exitCode) {
        //suiteDirectory = './reports/junitReports';
        console.log('Merging JUnit reports...');
        //var deferred = Promise.defer();
        var suiteDir = suiteDirectory;
        var destinationFile = suiteDir + '/../xml-results.xml';

        var fs = require('fs');
        var sourceFiles = fs.readdirSync(suiteDir)
            .filter(function(filename) {
                return filename.match(/^xml-results-.*.xml$/);
            })
            .map(function(filename) {
                return suiteDir + '/' + filename;
            });

        console.log('Source JUnit report files: ', sourceFiles);
        console.log('Destination JUnit report file: ', destinationFile);

        var fs = require('fs');
       
        var parser = new xml2js.Parser();
        var builder = new xml2js.Builder();
        
        // Reading each file in reports/junitReports and wrapping response to a promise
        var jsonObjs = sourceFiles.map(function(sourcePath) {
            return new Promise(function(resolve,reject){
        fs.readFile(sourcePath,function(err,data){
            parser.parseString(data, function (err, result) {
                if(err){
                    reject(err);
                }
                console.dir(result);
               /*  if(finalResult){
                    finalResult.testsuites.testsuite[finalResult.testsuites.testsuite.length]=
                    result.testsuites.testsuite[0];
                }else{
                    finalResult = result;
                } */
                resolve(result);
                console.log('Done');
            });
        })
    })
    });

    // Wait for all file
    return Promise.all(jsonObjs).then(function(results){
        var finalResult;
        results.forEach(function(result){
            if(finalResult){
                finalResult.testsuites.testsuite[finalResult.testsuites.testsuite.length]=
                result.testsuites.testsuite[0];
            }else{
                finalResult = result;
            }
        })
        return finalResult;

    }).then(function(res){
        return fs.writeFileSync(destinationFile, builder.buildObject(res), 'utf8');
        console.log(builder.buildObject(res));
    })
        console.log('JUnit reports merged into file: ', destinationFile);
    },
}

//reportUtils.mergeJUnitReports();
module.exports = reportUtils;