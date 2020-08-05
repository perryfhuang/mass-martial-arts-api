const mongoose = require('mongoose')

const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

const concentrationArr = ['MMA', 'Boxing', 'Kickboxing', 'Muay Thai', 'Tae Kwon Do', 'Brazilian Jiu Jitsu', 'Wrestling', 'Judo', 'Karate']

const gymSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  concentration: {
    type: String,
    required: true,
    enum: concentrationArr
  },
  address: {
    street: String,
    city: String,
    state: {
      type: String,
      uppercase: true,
      required: true,
      enum: statesArr
    },
    zip: {
      type: Number,
      required: true
    }
  },
  hours: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Gym', gymSchema)
