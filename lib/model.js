const Model = require('sequelize/lib/model')

Model.get = Model.findById;
Model.all = Model.findAll;