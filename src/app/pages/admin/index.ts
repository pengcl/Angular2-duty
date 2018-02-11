import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './login/login.component';
import {AdminIndexComponent} from './index/index.component';
import {AdminUploaderAvatarComponent} from './uploader/avatar/avatar.component';
import {AdminUploaderGalleryComponent} from './uploader/gallery/gallery.component';
import {ADMIN_PAGES_EMPLOYER_DECLARATIONS} from './employer';
import {ADMIN_PAGES_EMPLOYEE_DECLARATIONS} from './employee';

export const ADMIN_PAGES_DECLARATIONS = [
  AdminComponent,
  AdminLoginComponent,
  AdminIndexComponent,
  AdminUploaderAvatarComponent,
  AdminUploaderGalleryComponent,
  ...ADMIN_PAGES_EMPLOYER_DECLARATIONS,
  ...ADMIN_PAGES_EMPLOYEE_DECLARATIONS
];
