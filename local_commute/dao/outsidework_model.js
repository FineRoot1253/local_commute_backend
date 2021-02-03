const mongoose = require('mongoose');

const outsideWorkFormSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    dest: {type: String, required: true},
},{
    timestamps: true
});

outsideWorkFormSchema.statics.create = function(payload){
    console.log(payload);
    const work = new this(payload);
    return work.save();
};

outsideWorkFormSchema.statics.findOneByUserId = function(){
    console.log(userId);
    return this.findOne({ userId });
};

outsideWorkFormSchema.statics.updateByUserId = function (userId, payload) {
    return this.findOneAndUpdate({ userId }, payload, { new: true });
}

module.exports = mongoose.model('outsideWork', outsideWorkFormSchema);