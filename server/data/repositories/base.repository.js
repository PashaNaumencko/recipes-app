class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.find()
    .sort({ createdAt: 1, updatedAt: -1 });;
  }

  findOne({ where }) {
    return this.model.findOne({ where });
  }

  getById(id) {
    return this.model.findById(id);
  }

  create(data) {
    return this.model.create(data);
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data);
  }

  deleteById(id) {
    return this.model.findByIdAndRemove(id);
  }
}

module.exports = BaseRepository;
