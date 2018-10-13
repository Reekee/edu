import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'thaiDate',
})
export class ThaiDatePipe implements PipeTransform {
    transform(value: string, args: string) {
        let month = ['ม.ค.', 'ก.พ.', 'ม.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        let date = value.split("-");
        let d = date[2];
        let m = month[parseInt(date[1]) - 1];
        let y = date[0];
        return parseInt(d) + " " + m + " " + (parseInt(y) + 543);
    }
}
