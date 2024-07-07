import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SamplelistComponent } from './samplelist/samplelist.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminSamplesComponent } from './admin/admin-samples/admin-samples.component';
import { TextPageComponent } from './admin/text-page/text-page.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminTestimonialComponent } from './admin/admin-testimonial/admin-testimonial.component';
import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SampleDetailsComponent } from './sample-details/sample-details.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { ViewAllTestimonialsComponent } from './view-all-testimonials/view-all-testimonials.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TermsAndConditions } from './terms-and-conditions/terms-and-conditions.component';
const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
  },
  {
    path: 'admin/sample-orders',
    component: AdminOrdersComponent,
  },
  {
    path: 'admin/order-details',
    component: AdminOrderDetailsComponent,
  },
  {
    path: 'admin/services',
    component: AdminServicesComponent,
  },
  {
    path: 'admin/category',
    component: AdminCategoryComponent,
  },
  {
    path: 'admin/testimonials',
    component: AdminTestimonialComponent,
  },
  {
    path: 'admin/manage-client',
    component: AdminClientsComponent,
  },
  {
    path: 'admin/blogs',
    component: AdminBlogsComponent,
  },
  {
    path: 'admin/samples',
    component: AdminSamplesComponent,
  },
  {
    path: 'admin/text-page',
    component: TextPageComponent,
  },
  {
    path: 'admin/change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'admin/inquiries',
    component: AdminContactComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'contactus',
    component: ContactUsComponent,
  },
  {
    path: 'order',
    component: OrdersComponent,
  },
  {
    path: 'samples',
    component: SamplelistComponent,
  },
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'checkout',
    component:CheckoutComponent
  },
  {
    path:'terms-and-conditions',
    component:TermsAndConditions
  },
  {
    path: 'user-details',
    component: ProfileManagementComponent,
  },
  {
    path: 'all-testimonials',
    component: ViewAllTestimonialsComponent,
  },
  {
    path: 'sitemap',
    component: SiteMapComponent,
  },
  {
    path: 'services',
    component:ServiceListComponent
  },
  {
    path: 'blog/:slug',
    component: BlogDetailsComponent,
  },
  {
    path: 'services/:slug',
    component: ServiceDetailsComponent,
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
  },
  {
    path:'not-found',
    component: PageNotFoundComponent
  },
  {
    path: ':slug',
    component: SampleDetailsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
