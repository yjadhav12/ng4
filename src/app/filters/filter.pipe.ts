import {Pipe,PipeTransform} from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterArrayPipe implements PipeTransform {
    transform(value, args) {
        let filterKeys: string[];
        if (args[1]) {
            let parts = args[1].replace(' ', '').split(',');
            filterKeys = parts;
        }
        if (!args[0]) {
            return value;
        } else if (value) {
            return value.filter(item => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String && item[key]) && (item[key].indexOf(args[0]) !== -1)) {
                        if (filterKeys && filterKeys.length > 0) {
                            if (filterKeys.indexOf(key) > -1) {
                                return true;
                            }
                        }
                        else {
                            return true;
                        }
                    }
                }
            });
        }
    }
}