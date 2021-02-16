const mongoose = require('mongoose');

const outOfRangeUserSchema = new mongoose.Schema({
    userId: { type: String, required: true},
},{
    timestamps: true
});

outOfRangeUserSchema.statics.create = function(payload){
    console.log(payload);
    const user = new this(payload);
    return user.save();
};

outOfRangeUserSchema.statics.findOneByUserId = function(){
    console.log(userId);
    return this.findOne({ userId });
};

outOfRangeUserSchema.statics.updateByUserId = function (userId, payload) {
    return this.findOneAndUpdate({ userId }, payload, { new: true });
}

module.exports = mongoose.model('outOfRangeUser', outOfRangeUserSchema);