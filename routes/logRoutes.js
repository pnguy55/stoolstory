const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const axios = require('axios');
const decode = require('unescape');
// const { default: LogList } = require('../client/src/components/LogList');

const Log = mongoose.model('logs');


module.exports = app => {

    // user is included on cookie

    app.get('/api/stool/log', requireLogin, async (req, res) => {
        // the select recipients removes that from the get request
        const log = await Log.find({ _user: req.user.id });

        res.send(log);
    });

    app.get('/api/stool/logs', async (req, res) => {
        const logs = await Log.find({})
        
        res.send(logs);
    })

    app.delete('/api/tagLists/:tagListId', requireLogin, async (req, res) => {
        const tagList = await TagList.findByIdAndDelete(req.params.tagListId);
        console.log(tagList);

        res.status(200).send()
    })

    app.post('/api/stool/log', requireLogin, async (req, res) => {

        let {date_time, stool_type, pain_lvl, bloodiness, form_type } = req.body;

        let log_date = '0'
        let log_time = '0'
        
        if(log_date){
            log_date = date_time.split('T')[0].replace(/-/g,'');
            log_time = date_time.split('T')[1].replace(':','');
            date_time = `${log_date}${log_time}`;
        }

        const log = new Log({
            _user: req.user.id,
            //consistency: 'one of 3 types',
            stool_type,
            form_type,
            //color:  'select from color list',
            color: 'Blue',
            // datetime: 'mmddyyyy',
            log_date_time: date_time,
            log_date,
            // time_on_toilet: '00:00:00',
            time_on_toilet: 000000,
            // time: '00:00:00',
            log_time,
            //time_since_last: Date,
            pain_lvl,
            // bloodiness: 'none or 1-5',
            bloodiness,
            // note: "",
            note: 'String',
            business_analysis: {
                // stool_array: ['last 48 times on the loo'],
                stool_array: ['A', 'B'],
                // stool_average_freq: 'average_days_between'
                stool_average_freq: 3,
                // recommendations: ['recommended products'],
                recommendations: ['a', 'b'],
            }
        });

        try {            
            
            await log.save(function(err){
                if(err){
                    throw new Error(err);
                } 
            })               
            res.status(200).send(log);

        } catch(error) {
            res.status(500).send(error)
        }
            // console.log(200)
            // await log.save();

  
    });

    app.get('/api/tagLists/gatherVideoList/:videoTitle', async (req, res) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=14&part=snippet&order=viewCount&q=${req.params.videoTitle}+&type=video+&videoDefinition=high&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            .then(function (googleRes) {
                const { items } = googleRes.data;
                let index = 1;
                const videoList = _.map(items, ({snippet, id }) => {
                    return ({
                        videoIndex: index++,
                        title: decode(snippet.title),
                        videoId: id.videoId,
                        videoURL: `https://www.youtube.com/watch?v=${id.videoId}`,
                        thumbnail: snippet.thumbnails.medium,
                        channelTitle: snippet.channelTitle,
                        channelURL: `https://www.youtube.com/channel/${snippet.channelId}`
                    });
                })
                res.send(videoList);
            })
            .catch(function (error) {
                res.send(error);
            })
    })

    app.get('/api/tagLists/gatherTagLists/:listOfVideoIds', async (req, res) => {

        // ids must be separated by %
        const listOfVideoIds = req.params.listOfVideoIds.toString().replace(/\+/g,'%2C')
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${listOfVideoIds}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        .then(function (googleRes) {
            const { items } = googleRes.data;
            const tagList = _.map(items, ({ snippet }) => {
                return ({
                    channelTitle: snippet.channelTitle,
                    tags: snippet.tags
                });
            })
            res.send(tagList);
        })
        .catch(function (error) {
            res.send(error);
        })
    })


    // app.get('api/', requireLogin, (req, res) => {

    // });

};