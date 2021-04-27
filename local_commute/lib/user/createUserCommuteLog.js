const Userlog = require("../../models").user_worktime_log;

const createUserCommuteLog = async (req, res ,next) => {

    //data parsing
    let {
        user_email_addr,
        user_log_time = Date.now(),
        log_state
    } = req.body;

    //Create
    const result = await Userlog.create({
        user_email_addr,
        user_log_time ,
        log_state
    });

    if(!result){
        res.status(401).end();
        return;
    }

    return res.send(result.dataValues);        
}

module.exports = createUserCommuteLog;