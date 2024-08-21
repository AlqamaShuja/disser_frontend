import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { SamplesComponent } from './components/samples/samples.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './home/home.component';
import { HowToWriteComponent } from './components/how-to-write/how-to-write.component';
import { FooterComponent } from './components/footer/footer.component';
import { CtaComponent } from './components/cta/cta.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SampleDetailsComponent } from './sample-details/sample-details.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { SamplelistComponent } from './samplelist/samplelist.component';
import { TextPageComponent } from './admin/text-page/text-page.component';
import { AdminSamplesComponent } from './admin/admin-samples/admin-samples.component';
import { AdminServicesComponent } from './admin/admin-services/admin-services.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminTestimonialComponent } from './admin/admin-testimonial/admin-testimonial.component';
import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { MyInvoicesComponent } from './components/my-invoices/my-invoices.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UpdateOrderComponent } from './admin/update-order/update-order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { ViewAllTestimonialsComponent } from './view-all-testimonials/view-all-testimonials.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ChatInterfaceComponent } from './admin/chat-interface/chat-interface.component';
import { ResearchTopicsComponent } from './research-topics/research-topics.component';
import { AssignmentCategoriesComponent } from './assignment-categories/assignment-categories.component';
import { ServiceNewComponent } from './service-new/service-new.component';
import { OurProgramComponent } from './our-program/our-program.component';
import { AssistanceInfoComponent } from './assistance-info/assistance-info.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WhatmakesusbestSectComponent } from './whatmakesusbest-sect/whatmakesusbest-sect.component';
import { HowToOrderSectComponent } from './how-to-order-sect/how-to-order-sect.component';
import { QualityGuaranteedSectComponent } from './quality-guaranteed-sect/quality-guaranteed-sect.component';
import { PersonalManagerSectComponent } from './personal-manager-sect/personal-manager-sect.component';
import { ImproveGradesSectComponent } from './improve-grades-sect/improve-grades-sect.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { HomeTestimonialSectionComponent } from './home-testimonial-section/home-testimonial-section.component';
import { SampleTopicListComponent } from './sample-topic-list/sample-topic-list.component';
import { OurSamplesComponent } from './our-samples/our-samples.component';
import { OurSamplesDynamicCatLevelComponent } from './our-samples-dynamic-cat-level/our-samples-dynamic-cat-level.component';
import { OurSampleLevelTypeDetailsComponent } from './our-sample-level-type-details/our-sample-level-type-details.component';
import { AdminTopicListComponent } from './admin/admin-topic-list/admin-topic-list.component';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdminTextPagesComponent } from './admin/admin-text-pages/admin-text-pages.component';
import { AdminEditorComponent } from './admin-editor/admin-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContentEditableModelDirective } from '../app/directives/content-editable-model.directive';
import { AdminFaqInputComponent } from './admin/admin-faq-input/admin-faq-input.component';
import { AdminCouponPageComponent } from './admin/admin-coupon-page/admin-coupon-page.component';
import { AdminWriterPageComponent } from './admin/admin-manage-writer-profile/admin-manage-writer-profile.component';
import { AcademicLevelComponent } from './admin/academic-level/academic-level.component';
import { AdminSubjectAreaComponent } from './admin/admin-subject-area/admin-subject-area.component';


library.add(fas);
const modules = {};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ServicesComponent,
    TestimonialsComponent,
    SamplesComponent,
    SliderComponent,
    HomeComponent,
    HowToWriteComponent,
    FooterComponent,
    CtaComponent,
    OrderFormComponent,
    OrdersComponent,
    CheckoutComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    SampleDetailsComponent,
    SamplelistComponent,
    TextPageComponent,
    AdminSamplesComponent,
    AdminServicesComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    AdminOrderDetailsComponent,
    BlogsComponent,
    BlogDetailsComponent,
    AdminBlogsComponent,
    AdminTestimonialComponent,
    AdminClientsComponent,
    ServiceDetailsComponent,
    AdminLoginComponent,
    InvoiceComponent,
    ChangePasswordComponent,
    ProfileManagementComponent,
    UserOrdersComponent,
    MyInvoicesComponent,
    EditProfileComponent,
    UserChangePasswordComponent,
    UpdateOrderComponent,
    OrderDetailsComponent,
    AdminContactComponent,
    ViewAllTestimonialsComponent,
    SiteMapComponent,
    ServiceListComponent,
    PageNotFoundComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminTasklistComponent,
    AccordionComponent,
    ChatInterfaceComponent,
    ResearchTopicsComponent,
    AssignmentCategoriesComponent,
    ServiceNewComponent,
    OurProgramComponent,
    AssistanceInfoComponent,
    WhatmakesusbestSectComponent,
    HowToOrderSectComponent,
    QualityGuaranteedSectComponent,
    PersonalManagerSectComponent,
    ImproveGradesSectComponent,
    FaqSectionComponent,
    HomeTestimonialSectionComponent,
    SampleTopicListComponent,
    OurSamplesComponent,
    OurSamplesDynamicCatLevelComponent,
    OurSampleLevelTypeDetailsComponent,
    AdminTopicListComponent,
    AdminTextPagesComponent,
    AdminEditorComponent,
    ContentEditableModelDirective,
    AdminFaqInputComponent,
    AdminCouponPageComponent,
    AdminWriterPageComponent,
    AcademicLevelComponent,
    AdminSubjectAreaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 5000,
      progressBar: true,
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(
      
    ),
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    NgxPayPalModule,
    CarouselModule,
    ButtonModule,
    AngularEditorModule,
    FormsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ModalModule.forRoot(),
    CKEditorModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '200140869310-8b3irhd4br770u9q5um02k7fdjgco9dv.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
