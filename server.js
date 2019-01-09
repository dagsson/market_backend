var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var routes = require('./routes.js');
var app = express();
var mongoose = require('mongoose');
const Issue = require('./models/issue');

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var options = {
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    useMongoClient: true
};
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/farmdb?authSource=admin');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!')
})

router.route('/farm').get((req, res) => {
    Issue.find((err, issues) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(issues);
        } 
    })
});

router.route('/farm/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
})

router.route('/farm/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'farm': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/farm/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.type = req.body.type;
            issue.properties = req.body.properties;
            issue.geometry = req.body.geometry;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/farm/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

//app.get('/', (req, res) => res.send('Hello World!'));

routes(app);

app.use('/', router);

var server = app.listen(process.env.PORT, function(){
    console.log("app running on port." , server.address().port);
})
