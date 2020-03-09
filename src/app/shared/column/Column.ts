
import {EColumn} from './ColumnType';

export class Column
{
   public key: string;

   public type: EColumn;

   public value: any;


   public constructor(key: string, type: EColumn, value: any)
   {
      this.key = key;
      this.type = type;
      this.value = value;
   }
}
