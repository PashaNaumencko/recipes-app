import { Model, Document, CreateQuery, UpdateQuery } from 'mongoose';

class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  getAll(): Promise<T[]> {
    return this.model.find()
      .sort({ createdAt: 1, updatedAt: -1 })
      .exec();
  }

  findOne({ where }): Promise<T> {
    return this.model.findOne({ where })
      .exec();
  }

  getById(id: string): Promise<T> {
    return this.model.findById(id)
      .exec();
  }

  create(data: CreateQuery<T>): Promise<T> {
    return this.model.create(data);
  }

  updateById(id: string, data: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, data)
      .exec();
  }

  deleteById(id: string): Promise<T> {
    return this.model.findByIdAndRemove(id)
      .exec();
  }
}

export default BaseRepository;
