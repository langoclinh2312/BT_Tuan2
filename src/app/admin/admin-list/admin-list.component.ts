import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls:['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  admins: any[] = [];
  isAddAdminFormOpen = false;
  isEditAdminFormOpen = false;
  addAdminForm: FormGroup;
  editAdminForm: FormGroup;
  selectedAdminId!: string | null;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.addAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      roles: ['', Validators.required],
    }, { validators: [this.passwordMatchValidator] });

    this.editAdminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      roles: ['user', Validators.required],
    });
  }
   // Getters for easy access to form controls
   get username() { return this.addAdminForm.get('username'); }
   get password() { return this.addAdminForm.get('password'); }
   get email() { return this.addAdminForm.get('email'); }
   get fullName() { return this.addAdminForm.get('fullName'); }
   get phoneNumber() { return this.addAdminForm.get('phoneNumber'); }
   get address() { return this.addAdminForm.get('address'); }
   get roles() { return this.addAdminForm.get('roles'); }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(
      (data) => {
        this.admins = data;
      },
      (error) => {
        console.error('Error loading admins:', error);
      }
    );
  }

  openAddAdminForm() {
    this.isAddAdminFormOpen = true;
  }

  closeAddAdminForm() {
    this.isAddAdminFormOpen = false;
    this.addAdminForm.reset();
  }

  addAdmin() {
    if (this.addAdminForm.valid) {
      const adminData = this.addAdminForm.value;
      this.adminService.addAdmin(adminData).subscribe(
        () => {
          this.loadAdmins();
          this.closeAddAdminForm();
        },
        (error) => {
          console.error('Error adding admin:', error);
        }
      );
    } else {
      // Form is invalid, show error messages or handle accordingly
      this.validateAllFormFields(this.addAdminForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    // Mark all fields as touched to trigger validation messages
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!; // Add the non-null assertion operator here
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;
  
    // Check if password and repeatPassword match
    if (password !== repeatPassword) {
      formGroup.get('repeatPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('repeatPassword')?.setErrors(null);
    }
  
    return null;
  }


  openEditAdminForm(adminId: string) {
    const selectedAdmin = this.admins.find((admin) => admin.id === adminId);
    if (selectedAdmin) {
      this.selectedAdminId = adminId;
      this.editAdminForm.setValue({
        username: selectedAdmin.username,
        password: selectedAdmin.password,
        email: selectedAdmin.email,
        fullName: selectedAdmin.fullName,
        phoneNumber: selectedAdmin.phoneNumber,
        address: selectedAdmin.address,
        roles: selectedAdmin.roles,
      });
      this.isEditAdminFormOpen = true;
    }
  }

  closeEditAdminForm() {
    this.selectedAdminId = null;
    this.isEditAdminFormOpen = false;
    this.editAdminForm.reset();
  }

  editAdmin() {
    if (this.editAdminForm.valid && this.selectedAdminId !== null) {
      const adminData = this.editAdminForm.value;
      this.adminService.editAdmin(this.selectedAdminId, adminData).subscribe(
        () => {
          this.loadAdmins();
          this.closeEditAdminForm();
        },
        (error) => {
          console.error('Error editing admin:', error);
        }
      );
    }
  }

  deleteAdmin(adminId: string) {
    this.adminService.deleteAdmin(adminId).subscribe(
      () => {
        this.loadAdmins();
      },
      (error) => {
        console.error('Error deleting admin:', error);
      }
    );
  }
}
