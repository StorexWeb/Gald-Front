export abstract class ComponentGenerator {

    public abstract generateColumns(): any[];

    public abstract generateFilterColumns(): any[];

    public abstract generateAction(): any[];

    public abstract runActions(event): Promise<any>;


    public generateComponent(): any
    {
        return {
            actions: this.generateAction(),
            columns: this.generateColumns(),
            filterColumns: this.generateFilterColumns()
        };
    }

}
