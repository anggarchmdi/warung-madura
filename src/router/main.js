import HomeView from '@/views/home/index.vue'
import UserView from '@/views/user/index.vue'
import UserCreateView from '@/views/user/create.vue'
import UserUpdateView from '@/views/user/update.vue'
import CategoryAddView from '@/views/add-category/index.vue'
import ProductAddView from '@/views/add-product/index.vue'
import CartView from '@/views/cart/index.vue'
import PaymentView from '@/views/payments/index.vue'
import NotFound from '@/views/notfound/index.vue'
import ExampleLayout from '@/layouts/ExampleLayout.vue';

// middleware
import AuthMiddleware from '@/middleware/auth.middleware.js';

export default [{
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home | PT Warung Madura',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      title: 'User',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: UserCreateView,
    meta: {
      title: 'User Create',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user/update',
    name: 'user.update',
    component: UserUpdateView,
    meta: {
      title: 'User Update',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/category/add',
    name: 'category.add',
    component: CategoryAddView,
    meta: {
      title: 'add category',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/product/add',
    name: 'product.add',
    component: ProductAddView,
    meta: {
      title: 'add product',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: {
      title: 'cart',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/payments',
    name: 'payments',
    component: PaymentView,
    meta: {
      title: 'Payment Sukses',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path:'/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
    meta: {
      title: 'Halaman ini tidak tersedia',
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
]
