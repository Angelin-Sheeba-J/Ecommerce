import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(users: any[], selectedRole: string): any[] {
    if (!users || selectedRole === 'all') {
      return users; // Return all users if "All Roles" is selected
    }
    return users.filter(user => user.roleId == selectedRole);
  }

}
