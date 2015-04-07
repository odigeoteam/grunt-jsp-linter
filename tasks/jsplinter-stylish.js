'use strict';
var chalk = require('chalk');
var table = require('text-table');
var _ = require('underscore');

/**
 * @param {} errors
 * @param Array errors.errorsCollection
 * @param String errors.fileName
 */
module.exports = function(errors) {
    var errorCount = 0;

    var report = [];

    _.forEach(errors, function(error) {
        if (!!error.errorCollection && error.errorCollection.length) {
            errorCount += error.errorCollection.length;

            var output = _.map(error.errorCollection, function(error) {
                return [
                    '',
                    chalk.gray(error.line),
                    chalk.gray(error.col),
                    process.platform !== 'win32' ? chalk.blue(error.message) : chalk.cyan(error.message),
                    chalk.red(error.evidence),
                ];
            });

            report.push([
                '',
                chalk.underline(error.fileName),
                table(output),
                ''
            ].join('\n'));
        }
    });

    if (errorCount) {
        // Output results
        console.log(report.join(''));
    } else {
        console.log('No jsp errors found.');
    }
};