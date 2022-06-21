import { Pipe, PipeTransform } from '@angular/core';
import { Subcategory } from '../transaction/model/subcategory';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(subCategories: Subcategory[], category: string): Subcategory[] {
    return subCategories?.filter(subCategories => subCategories.categoryName == category)
  }

}
