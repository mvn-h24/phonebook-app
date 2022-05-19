import { DBSchema, IDBPDatabase, StoreNames, StoreValue } from "idb";
import { StoreKey } from "idb/build/entry";

export abstract class IDBEntity<
  EName extends StoreNames<EScheme>,
  EScheme extends DBSchema
> {
  protected abstract tName: EName;
  constructor(protected db: IDBPDatabase<EScheme>) {}
  public addOne(dto: StoreValue<EScheme, EName>) {
    return this.db.add(this.tName, dto);
  }
  public getOne(id: StoreKey<EScheme, EName> | IDBKeyRange) {
    return this.db.get(this.tName, id);
  }
  public getAll() {
    return this.db.getAll(this.tName);
  }
  public updateOne(dto: StoreValue<EScheme, EName>) {
    return this.db.put(this.tName, dto);
  }
  public deleteOne(id: StoreKey<EScheme, EName>) {
    return this.db.delete(this.tName, id);
  }
}
