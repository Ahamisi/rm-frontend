declare module '@/views/Components/SuccessAlertToast.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{
    message: string;
    duration?: number;
    isVisible: boolean;
  }, {}, any>;
  export default component;
}
