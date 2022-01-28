// this contains all basic CRUD endpoints on a schema
var ObjectID = require("mongodb").ObjectID;
// the schema is supplied by injection
class CrudController {
    constructor(model) {
        this.model = model;
    }

    // we HAVE to use lambda functions here, as they have
    // lexical scope for 'this'
    create = async(req, res, next) => {
        const entity = new this.model(req.body);
        entity.user = req.userData.userId;
        await entity.save();
        res.status(201).json({
            created: entity,
            id: entity.id,
        });
    };

    getAll = async(req, res, next) => {
        const entities = await this.model.find();
        res.status(200).send(entities);
    };

    getOne = async(req, res, next) => {
        const valid = ObjectID.isValid(req.params.id);

        if (valid) {
            const entity = await this.model.findById(req.params.id);
            res.status(200).json(entity);
        } else {
            res.status(400).json("Invalid ID");
        }
    };

    update = async(req, res, next) => {
        const valid = await ObjectID.isValid(req.params.id);
        if (valid) {
            const entity = await this.model.findById(req.params.id);
            if (entity !== null) {
                if (entity.user == req.userData.userId) {
                    await entity.update(req.body);
                    const updatedEntity = await this.model.findById(req.params.id);
                    res.status(200).json({
                        status: "Succeeded",
                        message: "Updated your object",
                        object: updatedEntity,
                    });
                } else {
                    res.status(400).json({
                        status: "Failed",
                        message: "This is not yours",
                    });
                }
            } else {
                res.status(404).json({ message: "No object found" });
            }
        } else {
            res.status(400).json({
                status: "Error",
                message: "The given ID is incorrect",
            });
        }
    };

    delete = async(req, res, next) => {
        const valid = await ObjectID.isValid(req.params.id);
        // this happens in two steps to make mongoose middleware run
        if (valid) {
            const entity = await this.model.findById(req.params.id);
            if (entity !== null) {
                console.log(
                    "deleting obj " + req.userData.userId + " with userid: " + entity.user
                );
                if (entity.user == req.userData.userId) {
                    await entity.delete();
                    res.status(200).json({
                        status: "Succeeded",
                        message: "Deleted your object",
                        object: entity,
                    });
                } else {
                    res.status(400).json({
                        status: "Failed",
                        message: "This is not yours",
                    });
                }
            } else {
                res.status(404).json({ message: "No object found" });
            }
        } else {
            res.status(404).json({
                status: "Error",
                message: "The given ID is incorrect",
            });
        }
    };
}

module.exports = CrudController;