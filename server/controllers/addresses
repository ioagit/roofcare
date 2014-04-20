/**
 * Created by cerker on 4/20/2014.
 */

exports.getAddress = function(Address)
{
    return function (req, res) {

        Address.find({}).exec(function (err, collection) {

                res.send(collection);

            } // End Exec Callback
        ); //Close Exec function
    };

}